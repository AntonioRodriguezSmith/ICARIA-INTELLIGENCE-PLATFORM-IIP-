# Guía rápida de uso de la extensión SwaggerHub en Visual Studio Code

## Configuración inicial
1. Instala la extensión SwaggerHub en VS Code.
2. Ve a la configuración y agrega:
   - **Api Key**: Copia desde tu perfil en SwaggerHub.
   - **Destination**: Usa la URL por defecto (SaaS) o la de tu servidor On-Premise.
   - **Orgs**: Añade el nombre de tu organización o tu usuario.
   - **Custom Headers**: Solo si tu red lo requiere.

## Funciones principales
- Visualiza y navega por APIs y dominios de SwaggerHub.
- Edita y guarda definiciones directamente en SwaggerHub.
- Crea APIs/domains desde cero o usando plantillas.
- Crea nuevas versiones de APIs/domains.
- Previsualiza APIs en Swagger UI y prueba endpoints (incluye mocks).
- Valida tus definiciones OpenAPI 2.0/3.0 y detecta errores de sintaxis.
- Cambia visibilidad y estado (public/private, published/unpublished).
- Elimina versiones o definiciones completas.
- Recarga la lista de APIs/domains y filtra por nombre.
- Navega y consulta referencias ($ref) dentro de tus specs.

## Recomendaciones
- Mantén tu Api Key segura.
- Usa la función de filtro para encontrar APIs rápidamente.
- Consulta la documentación oficial y abre issues en GitHub si tienes dudas.

---
## Tareas pendientes
- Automatizar generación y verificación de credenciales Git/GitHub
- Integrar tests automáticos para MCP Server
- Documentar integración de Grafana y Prometheus
- Configurar Redis o RabbitMQ para colas/caché
- Configurar Elastic Stack (ELK) para logs
- Configurar Terraform/Pulumi para IaC
- Configurar Nginx o Traefik como reverse proxy
