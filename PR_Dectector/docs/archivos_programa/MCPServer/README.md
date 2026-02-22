# Documentación de la API y Lógica del MCP Server

Este microservicio expone la API principal para el análisis y validación de casos Broker frente a condiciones ICARIA.

## Descripción General

La lógica de matching y validación implementada en el MCP Server está documentada en detalle en [../analisis/ALGORITMO_DETALLADO.md](../../analisis/ALGORITMO_DETALLADO.md). Consulta ese archivo para entender la estructura de condiciones, funciones principales y el flujo de análisis.

## Especificación OpenAPI

La definición de los endpoints y sus respuestas se encuentra en el archivo `openapi.yaml` de esta carpeta.

## Resumen de la Lógica de Matching

- El motor recibe casos y condiciones, y aplica algoritmos de coincidencia (regex, keywords, similitud de texto).
- Calcula un scoring de cobertura y genera reportes detallados.
- Los endpoints principales permiten enviar casos, obtener resultados y consultar estadísticas.

## Referencias
- [Guía detallada del algoritmo de matching](../../analisis/ALGORITMO_DETALLADO.md)
- [openapi.yaml](openapi.yaml)

## Cómo levantar el MCP Server (FastAPI)

### 1. Requisitos
- Python 3.10+
- Instalar dependencias:
  ```bash
  pip install fastapi uvicorn pydantic
  ```

### 2. Ejecutar el servidor
  ```bash
  python main.py
  ```

El servidor quedará disponible en http://localhost:8000

### 3. Probar los endpoints
- Estado del servidor:
  ```bash
  curl http://localhost:8000/status
  ```
- Analizar casos (ejemplo):
  ```bash
  curl -X POST http://localhost:8000/analizar -H "Content-Type: application/json" -d '{"casos": [], "condiciones": []}'
  ```

### 4. Documentación interactiva (Swagger UI)
Accede a http://localhost:8000/docs para ver y probar la API con Swagger UI generada automáticamente por FastAPI.

## Configuración de credenciales y variables de entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.sample .env
   ```
2. Personaliza las variables si es necesario. Por defecto:
   - MCP_API_KEY=Loopit$01
   - MCP_SERVER_URL=http://localhost:8000
   - USER=Antonio (puedes cambiarlo por tu nombre si lo necesitas)

> **Nota:** Estas credenciales y claves se usarán como estándar para todo el equipo durante el desarrollo. Nunca subas el archivo `.env` real al repositorio.