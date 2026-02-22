import os
import getpass
import subprocess
import logging
from cryptography.fernet import Fernet


# Configuración de logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Obtener ruta base del script
base_dir = os.path.dirname(os.path.abspath(__file__))


# Obtener usuario y token de variables de entorno o entrada interactiva
usuario = os.getenv("GIT_USUARIO") or input("Introduce tu usuario de GitHub: ")
token = os.getenv("GIT_TOKEN") or getpass.getpass("Introduce tu token de acceso personal (PAT): ")

# Validar formato básico
if not usuario or not token or len(token) < 20:
    logging.error("Usuario o token no válidos. El token debe tener al menos 20 caracteres.")
    exit(1)

# Generar clave de encriptación y encriptar token
key_path = os.path.join(base_dir, "git_token.key")
if not os.path.exists(key_path):
    key = Fernet.generate_key()
    with open(key_path, "wb") as kf:
        kf.write(key)
else:
    with open(key_path, "rb") as kf:
        key = kf.read()
fernet = Fernet(key)
token_encrypted = fernet.encrypt(token.encode()).decode()


# Guardar credenciales en .env (ruta relativa a base_dir)
ruta_env = os.path.join(base_dir, "..", "..", "PR_Dectector", "docs", "archivos_programa", "MCPServer", ".env")
os.makedirs(os.path.dirname(ruta_env), exist_ok=True)
with open(ruta_env, "w") as f:
    f.write(f"GIT_USUARIO={usuario}\nGIT_TOKEN_ENCRYPTED={token_encrypted}\n")
logging.info(f"Credenciales guardadas en {ruta_env} (token encriptado)")


# Verificar acceso a GitHub
try:
    repo_url = f"https://{usuario}:{token}@github.com/AntonioRodriguezSmith/ICARIA-INTELLIGENCE-PLATFORM-IIP-.git"
    resultado = subprocess.run(["git", "ls-remote", repo_url], capture_output=True, text=True, timeout=15)
    if resultado.returncode == 0:
        logging.info("Acceso a GitHub verificado correctamente.")
    else:
        logging.error("No se pudo verificar el acceso a GitHub. Revisa el usuario o token.")
        logging.error(f"Salida de error: {resultado.stderr}")
except Exception as e:
    logging.error(f"Error al verificar acceso a GitHub: {e}")


# Opcional: Guardar en Vault
# (Descomentar si tienes Vault instalado y configurado)
# import hvac
# cliente = hvac.Client()
# cliente.secrets.kv.v2.create_or_update_secret(path='git', secret={'usuario': usuario, 'token': token_encrypted})

# Documentación:
# Este script solicita credenciales de GitHub, las valida, encripta el token y guarda en .env.
# Permite ejecución interactiva o por variables de entorno (útil para CI/CD).
# El token se encripta con Fernet y la clave se guarda en git_token.key.
# Verifica acceso al repositorio y permite integración opcional con Vault.
