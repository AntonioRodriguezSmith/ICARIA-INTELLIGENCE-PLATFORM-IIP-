import os
import getpass
import subprocess

# Solicitar usuario y token
usuario = input("Introduce tu usuario de GitHub: ")
token = getpass.getpass("Introduce tu token de acceso personal (PAT): ")

# Configurar usuario global de Git
def configurar_git(usuario):
    subprocess.run(["git", "config", "--global", "user.name", usuario])
    subprocess.run(["git", "config", "--global", "user.email", f"{usuario}@dominio.com"])

configurar_git(usuario)

# Guardar credenciales en .env
ruta_env = os.path.join("PR_Dectector", "docs", "archivos_programa", "MCPServer", ".env")
with open(ruta_env, "w") as f:
    f.write(f"GIT_USUARIO={usuario}\nGIT_TOKEN={token}\n")

# Verificar acceso a GitHub
repo_url = f"https://{usuario}:{token}@github.com/AntonioRodriguezSmith/ICARIA-INTELLIGENCE-PLATFORM-IIP-.git"
resultado = subprocess.run(["git", "ls-remote", repo_url], capture_output=True)
if resultado.returncode == 0:
    print("Acceso a GitHub verificado correctamente.")
else:
    print("Error: No se pudo verificar el acceso a GitHub. Revisa el usuario o token.")

# Opcional: Guardar en Vault
# (Descomentar si tienes Vault instalado y configurado)
# import hvac
# cliente = hvac.Client()
# cliente.secrets.kv.v2.create_or_update_secret(path='git', secret={'usuario': usuario, 'token': token})
