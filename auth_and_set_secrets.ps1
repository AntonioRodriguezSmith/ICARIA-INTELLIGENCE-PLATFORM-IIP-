# Script para automatizar generación y verificación de credenciales Git/GitHub
# Uso: Ejecutar en PowerShell

# Solicitar usuario y token
$GitUser = Read-Host "Introduce tu usuario de GitHub"
$GitToken = Read-Host "Introduce tu token de acceso (PAT)"

# Configurar usuario global
Write-Host "Configurando usuario global de Git..."
git config --global user.name "$GitUser"
git config --global user.email "$GitUser@dominio.com"

# Guardar credenciales en .env
$envPath = "PR_Dectector/docs/archivos_programa/MCPServer/.env"
$envContent = "GIT_USER=$GitUser`nGIT_TOKEN=$GitToken"
Set-Content -Path $envPath -Value $envContent

# Verificar acceso a GitHub
Write-Host "Verificando acceso a GitHub..."
$test = git ls-remote https://$GitUser:$GitToken@github.com/AntonioRodriguezSmith/ICARIA-INTELLIGENCE-PLATFORM-IIP-.git
if ($test) {
    Write-Host "Acceso a GitHub verificado correctamente."
} else {
    Write-Host "Error: No se pudo verificar el acceso a GitHub. Revisa el usuario o token."
}

# Opcional: Guardar en Vault
# (Descomentar si tienes Vault instalado y configurado)
# vault kv put secret/git user=$GitUser token=$GitToken
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
