import os
import sys

# Obtener ruta base del proyecto
base_dir = os.path.dirname(os.path.abspath(__file__))

# Lista de módulos a verificar
modulos = [
    "black",
    "isort",
    "pytest",
    "pandas",
    "yaml",
    "requests",
    "flask",
    "sqlalchemy",
    "numpy",
    "pyyaml",
    "fastapi",
    "uvicorn",
    "json",
    "os",
    "sys",
    "platform",
    "subprocess",
    "shutil",
    "pathlib",
    "docker"
]

faltantes = []
for modulo in modulos:
    try:
        __import__(modulo)
    except ImportError:
        faltantes.append(modulo)

if not faltantes:
    print("Todos los módulos y utilidades se importaron correctamente.")
else:
    print("Faltan los siguientes módulos/utilidades:")
    for m in faltantes:
        print(f"- {m}")
    print("Revisa que las dependencias estén instaladas en tu entorno virtual.")

# Verificar archivos clave (rutas relativas a base_dir)
archivos = [
    "docker-compose.yml",
    "Dockerfile",
    os.path.join("PR_Dectector", "requirements.txt"),
    os.path.join("PR_Dectector", "docs", "archivos_programa", "MCPServer", ".env"),
    os.path.join("PR_Dectector", "config", "agente", "icaria-agent-config.yaml"),
    os.path.join("PR_Dectector", "docs", "archivos_programa", "MCPServer", "openapi.yaml")
]

faltan_archivos = []
for archivo in archivos:
    ruta = os.path.join(base_dir, archivo)
    if not os.path.exists(ruta):
        faltan_archivos.append(archivo)

if not faltan_archivos:
    print("Todos los archivos clave existen.")
else:
    print("Faltan los siguientes archivos clave:")
    for a in faltan_archivos:
        print(f"- {a}")

# Verificar conexión a Docker
try:
    import docker
    client = docker.from_env()
    client.ping()
    print("Conexión a Docker exitosa.")
except Exception as e:
    print(f"No se pudo conectar a Docker: {e}")

# Verificar conexión a base de datos (ejemplo para SQLAlchemy)
try:
    from sqlalchemy import create_engine
    db_path = os.path.join(base_dir, 'test.db')
    engine = create_engine(f'sqlite:///{db_path}')
    conn = engine.connect()
    conn.close()
    print("Conexión a base de datos SQLite exitosa.")
except Exception as e:
    print(f"No se pudo conectar a la base de datos: {e}")

# Verificar conexión HTTP (ejemplo)
try:
    import requests
    r = requests.get('https://api.github.com')
    if r.status_code == 200:
        print("Conexión HTTP a GitHub exitosa.")
    else:
        print(f"Conexión HTTP a GitHub fallida: {r.status_code}")
except Exception as e:
    print(f"No se pudo realizar conexión HTTP: {e}")
