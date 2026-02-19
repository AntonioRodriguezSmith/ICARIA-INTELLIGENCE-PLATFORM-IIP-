Write-Host "Autenticación GH CLI (se abrirá el navegador)..."
gh auth login --web
if ($LASTEXITCODE -ne 0) { Write-Error "gh auth login falló."; exit 1 }

gh auth status
if ($LASTEXITCODE -ne 0) { Write-Error "No estás autenticado."; exit 1 }

function Read-SecureSecret($prompt) {
  $s = Read-Host -AsSecureString "$prompt (entrada oculta)"
  if (-not $s) { return $null }
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($s)
  try { [Runtime.InteropServices.Marshal]::PtrToStringAuto($bstr) } finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

$mcp = Read-SecureSecret "MCP_API_KEY"
if ($mcp) {
  gh secret set MCP_API_KEY --body "$mcp"
  if ($LASTEXITCODE -eq 0) { Write-Host "MCP_API_KEY añadido." } else { Write-Warning "Fallo al añadir MCP_API_KEY." }
}

$githubToken = Read-SecureSecret "GITHUB_TOKEN (opcional)"
if ($githubToken) {
  gh secret set GITHUB_TOKEN --body "$githubToken"
  if ($LASTEXITCODE -eq 0) { Write-Host "GITHUB_TOKEN añadido." } else { Write-Warning "Fallo al añadir GITHUB_TOKEN." }
}

Write-Host "Listo. Verifica en el repositorio: Settings  Secrets  Actions."
