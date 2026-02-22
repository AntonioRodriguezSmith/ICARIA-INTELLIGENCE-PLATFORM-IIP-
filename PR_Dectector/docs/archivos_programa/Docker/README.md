# Docker y docker-compose para MCP Server

## Descripción
Esta configuración permite construir y ejecutar el microservicio MCP Server en un contenedor Docker, facilitando el despliegue y pruebas locales o en servidores.

---

## Archivos principales

- **Dockerfile**: Define la imagen base, dependencias y comandos para ejecutar el MCP Server.
- **docker-compose.yml**: Orquesta el servicio, mapea puertos y variables de entorno, y permite levantar el entorno completo con un solo comando.
- **.env.sample**: Archivo de ejemplo con variables de entorno necesarias para el MCP Server (referencia en `env_file`).

---

## Uso básico

### 1. Construir y levantar el servicio

```bash
docker-compose up --build
```

Esto construirá la imagen y levantará el contenedor `mcp-server` mapeando el puerto 5000.

### 2. Parar y eliminar los contenedores

```bash
docker-compose down
```

---

## Personalización

- Modifica el archivo `.env.sample` y renómbralo a `.env` para definir tus propias variables de entorno.
- Puedes agregar más servicios (por ejemplo, Redis, SonarQube, etc.) en el mismo `docker-compose.yml`.

---

## Notas
- El código fuente se monta como volumen para facilitar el desarrollo local.
- Asegúrate de tener Docker y docker-compose instalados.
- Si usas Windows, ejecuta los comandos desde PowerShell o WSL.

---

## Referencias
- [Documentación oficial de Docker](https://docs.docker.com/)
- [Documentación de docker-compose](https://docs.docker.com/compose/)

# Integración y validación con 42Crunch Platform

## Cambio importante

> **Nota:** La organización comunitaria gratuita de 42Crunch ya no está disponible. Ahora solo puedes usar cuentas individuales Freemium o tokens de pago para conectar y validar tus especificaciones OpenAPI.

## Pasos para conectar la extensión en VS Code

1. Regístrate o inicia sesión en https://platform.42crunch.com/ con tu cuenta personal.
2. Ve a tu perfil y copia el token Freemium.
3. Abre la extensión 42Crunch Platform en VS Code y pega el token en la sección `Connection`.
4. Ya puedes validar y auditar tus specs OpenAPI desde el editor.

## Recomendaciones
- Si necesitas funciones avanzadas, considera una suscripción de pago.
- Documenta este cambio en tu flujo de trabajo y comparte la información con tu equipo.
