# Guía de Integración de Programas y Herramientas

Esta guía detalla los pasos necesarios para integrar las herramientas y programas recomendados en el proyecto ICARIA, incluyendo los documentos y archivos requeridos para su correcta configuración.

----

## Índice

- [Swagger/OpenAPI](#1-swaggeropenapi)
- [SonarQube](#2-sonarqube)
- [Grafana y Prometheus](#3-grafana-y-prometheus)
- [Vault (HashiCorp)](#4-vault-hashicorp)
- [Redis o RabbitMQ](#5-redis-o-rabbitmq)
- [Elastic Stack (ELK)](#6-elastic-stack-elk)
- [Terraform o Pulumi](#7-terraform-o-pulumi)
- [Nginx o Traefik](#8-nginx-o-traefik)
- [Documentos y Archivos Requeridos](#documentos-y-archivos-requeridos)

----

## 1. **Swagger/OpenAPI**

### Propósito:
Documentar y probar las APIs del MCP Server.

### Pasos de integración:
1. Instalar Swagger/OpenAPI:
   ```bash
   npm install swagger-ui-express
   ```
2. Configurar el archivo `swagger.json` o `openapi.yaml` en el directorio del MCP Server.
3. Agregar el middleware de Swagger en el servidor:
   ```javascript
   const swaggerUi = require('swagger-ui-express');
   const swaggerDocument = require('./swagger.json');
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   ```
4. Verificar la documentación en `http://localhost:puerto/api-docs`.

---

## 2. **SonarQube**

### Propósito:
Análisis estático del código para detectar problemas de calidad y seguridad.

### Pasos de integración:
1. Descargar e instalar SonarQube desde [https://www.sonarqube.org/](https://www.sonarqube.org/).
2. Configurar el archivo `sonar-project.properties` en la raíz del proyecto:
   ```properties
   sonar.projectKey=ICARIA
   sonar.host.url=http://localhost:9000
   sonar.login=tu_token
   ```
3. Ejecutar el análisis:
   ```bash
   sonar-scanner
   ```

---

## 3. **Grafana y Prometheus**

### Propósito:
Monitorear el rendimiento del MCP Server y los contenedores.

### Pasos de integración:
1. Configurar Prometheus:
   - Crear un archivo `prometheus.yml` con las métricas necesarias.
   - Ejecutar Prometheus:
     ```bash
     docker run -d -p 9090:9090 -v prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
     ```
2. Configurar Grafana:
   - Ejecutar Grafana:
     ```bash
     docker run -d -p 3000:3000 grafana/grafana
     ```
   - Conectar Grafana a Prometheus como fuente de datos.

---

## 4. **Vault (HashiCorp)**

### Propósito:
Gestionar de forma segura las credenciales y secretos necesarios para el proyecto.

### Pasos de integración:
1. Descargar e instalar Vault desde [https://www.vaultproject.io/](https://www.vaultproject.io/).
2. Inicializar y configurar Vault:
   ```bash
   vault server -dev
   ```
3. Configurar las credenciales en Vault y actualizar el código para consumirlas.

---

## 5. **Redis o RabbitMQ**

### Propósito:
Manejar colas de mensajes o caché para mejorar la comunicación entre servicios.

### Pasos de integración:
1. Ejecutar Redis:
   ```bash
   docker run -d -p 6379:6379 redis
   ```
2. Ejecutar RabbitMQ:
   ```bash
   docker run -d -p 5672:5672 rabbitmq
   ```
3. Configurar el MCP Server para usar Redis o RabbitMQ según sea necesario.

---

## 6. **Elastic Stack (ELK)**

### Propósito:
Centralizar y analizar logs del MCP Server y otros servicios.

### Pasos de integración:
1. Configurar Elasticsearch, Logstash y Kibana:
   ```bash
   docker-compose up -d
   ```
2. Configurar los servicios para enviar logs a Logstash.
3. Visualizar los logs en Kibana.

---

## 7. **Terraform o Pulumi**

### Propósito:
Automatizar la provisión de infraestructura como código (IaC).

### Pasos de integración:
1. Instalar Terraform o Pulumi:
   ```bash
   # Terraform
   sudo apt-get install terraform

   # Pulumi
   npm install -g pulumi
   ```
2. Crear los archivos de configuración para la infraestructura.
3. Ejecutar los comandos para aprovisionar los recursos:
   ```bash
   terraform init
   terraform apply
   ```

---

## 8. **Nginx o Traefik**

### Propósito:
Optimizar el balanceo de carga y el enrutamiento entre servicios.

### Pasos de integración:
1. Configurar Nginx:
   - Crear un archivo `nginx.conf` con las reglas de enrutamiento.
   - Ejecutar Nginx:
     ```bash
     docker run -d -p 80:80 -v nginx.conf:/etc/nginx/nginx.conf nginx
     ```
2. Configurar Traefik:
   - Crear un archivo `traefik.yml` con las reglas necesarias.
   - Ejecutar Traefik:
     ```bash
     docker run -d -p 8080:8080 -v traefik.yml:/etc/traefik/traefik.yml traefik
     ```

---

## Documentos y Archivos Requeridos

1. **`MEMORIA_AGENTE_ICARIA.md`**: Contiene las configuraciones y flujos de trabajo generales.
2. **`HERRAMIENTAS_Y_PROGRAMAS.md`**: Lista de herramientas y programas recomendados.
3. **`Guia_Rapida.md`**: Pasos rápidos para configurar el entorno.
4. **Archivos de configuración**:
   - `swagger.json` o `openapi.yaml`
   - `sonar-project.properties`
   - `prometheus.yml`
   - `nginx.conf` o `traefik.yml`
5. **Scripts**:
   - `fix_json_summary.py`
   - `generate_kpis_combined.py`
   - `evaluate_rules.py`

---

Con esta guía, puedes integrar todas las herramientas y programas necesarios para optimizar el flujo de trabajo del proyecto ICARIA. Si necesitas más detalles, consulta los documentos vinculados o solicita ayuda adicional.