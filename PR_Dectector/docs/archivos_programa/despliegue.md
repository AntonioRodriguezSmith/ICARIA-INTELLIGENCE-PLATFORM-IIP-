Despliegue y ejecución rápida
=================================

Requisitos
---------
- Docker Desktop (opcional para ejecutar containers)
- Python 3.10 (para ejecución local)

Variables de entorno
--------------------
- `MCP_API_KEY`: clave del MCP Server
- `MCP_SERVER_URL`: URL del MCP Server (por defecto http://localhost:8000)

Levantar localmente con Docker Compose
-------------------------------------
Desde la carpeta `Detector`:

```bash
docker-compose up -d
```

El servicio `detector` monta el código para poder ejecutar los scripts dentro del contenedor.

Ejecución local de scripts
--------------------------
Instala dependencias:

```bash
python -m pip install -r requirements.txt
```

Generar KPIs:

```bash
python src/scripts/generate_kpis_combined.py
```

Pruebas
------

```bash
pytest
```

Nuevas Herramientas y Programas
------------------------------
- **Flask**: Framework para desarrollo de aplicaciones web.
- **SQLAlchemy**: ORM para la gestión de bases de datos.
- **NumPy**: Biblioteca para cálculos numéricos avanzados.

Configuración Adicional
------------------------
1. **Instalación de Flask y SQLAlchemy**:
   ```bash
   python -m pip install flask sqlalchemy
   ```

2. **Uso de NumPy para cálculos**:
   - Asegúrate de que NumPy esté instalado:
     ```bash
     python -m pip install numpy
     ```

3. **Integración con el MCP Server**:
   - Flask puede ser utilizado para crear endpoints adicionales para el MCP Server.
   - SQLAlchemy permite gestionar la persistencia de datos de manera eficiente.

Ejemplo de Endpoint con Flask
-----------------------------
```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/status', methods=['GET'])
def status():
    return jsonify({"status": "MCP Server activo"})

if __name__ == '__main__':
    app.run(debug=True)
```
