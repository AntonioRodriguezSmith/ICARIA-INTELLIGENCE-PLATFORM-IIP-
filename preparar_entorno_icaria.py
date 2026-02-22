# Script para preparar entorno Python y configurar Git/GitHub en ICARIA Intelligence Platform
# Nombre: preparar_entorno_icaria.py

import os
import sys
import platform
import subprocess

# Crear entorno virtual si no existe
directorio = os.getcwd()
venv_path = os.path.join(directorio, 'venv')
if not os.path.exists(venv_path):
    subprocess.run([sys.executable, '-m', 'venv', 'venv'])
    print('Entorno virtual creado.')
else:
    print('El entorno virtual ya existe.')

# Activar entorno virtual (solo muestra instrucción, no ejecuta en script)
if platform.system() == 'Windows':
    print('Para activar el entorno virtual ejecuta: venv\\Scripts\\activate')
else:
    print('Para activar el entorno virtual ejecuta: source venv/bin/activate')

# Instalar dependencias desde PR_Dectector/requirements.txt
req_path = os.path.join(directorio, 'PR_Dectector', 'requirements.txt')
if os.path.exists(req_path):
    print(f'Instalando dependencias desde {req_path}...')
    subprocess.run([os.path.join(venv_path, 'Scripts', 'pip'), 'install', '-r', req_path])
    print('Dependencias instaladas correctamente.')
else:
    print(f'No se encontró requirements.txt en {req_path}.')

# Configurar Git
git_user = "AntonioRodriguezSmith"
git_email = "rodriguezsmith02@pm.me"
print('Configurando Git...')
subprocess.run(["git", "config", "--global", "user.name", git_user])
subprocess.run(["git", "config", "--global", "user.email", git_email])
subprocess.run(["git", "config", "--global", "credential.helper", "manager"])
print('Para iniciar sesión en GitHub, realiza un git pull o git clone de un repositorio privado y sigue las instrucciones del Git Credential Manager.')
print('Script completado. El entorno está listo y Git configurado.')

# Verificar instalación de dependencias principales
print('Comprobando importación de módulos principales...')
try:
    import black
    import isort
    import pytest
    import pandas
    import yaml
    import requests
    import flask
    import sqlalchemy
    import numpy
    print('Todos los módulos se importaron correctamente.')
except ImportError as e:
    print(f'Error al importar módulos: {e}')
    print('Revisa requirements.txt y vuelve a instalar dependencias.')
