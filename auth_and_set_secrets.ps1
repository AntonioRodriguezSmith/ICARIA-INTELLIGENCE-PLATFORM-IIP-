Write-Host "Autenticación GH CLI (se abrirá el navegador)..."
try {
    gh auth login --web
    if ($LASTEXITCODE -ne 0) { throw "gh auth login falló." }

    gh auth status
    if ($LASTEXITCODE -ne 0) { throw "No estás autenticado." }
} catch {
    Write-Error $_
    exit 1
}

function Read-SecureSecret($prompt) {
    $s = Read-Host -AsSecureString "$prompt (entrada oculta)"
    if (-not $s) { return $null }
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($s)
    try {
        [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr)
    } finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
}

$mcp = Read-SecureSecret "MCP_API_KEY"
if ($mcp) {
    try {
        gh secret set MCP_API_KEY --body "$mcp"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "MCP_API_KEY añadido."
        } else {
            throw "Fallo al añadir MCP_API_KEY."
        }
    } catch {
        Write-Warning $_
    }
}

$githubToken = Read-SecureSecret "GITHUB_TOKEN (opcional)"
if ($githubToken) {
    try {
        gh secret set GITHUB_TOKEN --body "$githubToken"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "GITHUB_TOKEN añadido."
        } else {
            throw "Fallo al añadir GITHUB_TOKEN."
        }
    } catch {
        Write-Warning $_
    }
}

Write-Host "Listo. Verifica en el repositorio: Settings > Secrets > Actions."
