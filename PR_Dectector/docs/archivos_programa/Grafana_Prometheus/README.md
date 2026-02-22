# Integración de Grafana y Prometheus

## Levantar el entorno completo

1. Asegúrate de tener Docker y docker-compose instalados.
2. Ejecuta:
   ```bash
   docker-compose up --build
   ```
3. Accede a:
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3000 (usuario y contraseña por defecto: admin/admin)
   - MCP Server: http://localhost:5000

## Configuración de Prometheus
- El archivo `prometheus.yml` ya está listo para monitorear el MCP Server en el puerto 5000.
- Puedes agregar más targets en el futuro.

## Configuración de Grafana
- Una vez levantado, accede a Grafana y agrega Prometheus como fuente de datos:
  - URL: http://prometheus:9090
- Crea dashboards personalizados para visualizar métricas.

## Recomendaciones
- Documenta los dashboards creados y compártelos con el equipo.
- Puedes extender el docker-compose para incluir otros servicios (Redis, ELK, etc.).

---
// ...existing code...
