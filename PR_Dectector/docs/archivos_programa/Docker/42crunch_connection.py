import os
import requests

# Cargar variables de entorno
API_KEY = os.getenv('42CRUNCH_API_KEY')
API_URL = os.getenv('42CRUNCH_API_URL', 'https://platform.42crunch.com/api')
OPENAPI_PATH = os.getenv('OPENAPI_SPEC_PATH', 'openapi.yaml')

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/yaml'
}

with open(OPENAPI_PATH, 'rb') as f:
    spec_data = f.read()

# Endpoint para subir el spec (puede variar según la API de 42Crunch)
endpoint = f"{API_URL}/specs/upload"

response = requests.post(endpoint, headers=headers, data=spec_data)

if response.status_code == 200:
    print('Especificación OpenAPI enviada correctamente a 42Crunch.')
    print('Respuesta:', response.json())
else:
    print('Error al enviar la especificación:', response.status_code)
    print(response.text)
