
# Guía Rápida (Detector)

## Índice

- [Objetivo](#objetivo)
- [Pasos rápidos](#pasos-rápidos)
- [Herramientas recomendadas para optimizar el flujo de trabajo](#herramientas-recomendadas-para-optimizar-el-flujo-de-trabajo)
- [Comandos útiles para tareas de KPIs y validación](#comandos-útiles-para-tareas-de-kpis-y-validación)

[Volver a la memoria del agente ICARIA](./MEMORIA_AGENTE_ICARIA.md)

---

**Nota:** Antes de comenzar, asegúrate de haber descargado e instalado los programas necesarios siguiendo la [Guía de Integración de Programas y Herramientas](./Guia_Integracion_Programas.md).

---

**Índice**

1. [Objetivo](#objetivo)
2. [Pasos rápidos](#pasos-rápidos)
3. [Herramientas recomendadas para optimizar el flujo de trabajo](#herramientas-recomendadas-para-optimizar-el-flujo-de-trabajo)
4. [Comandos útiles para tareas de KPIs y validación](#comandos-útiles-para-tareas-de-kpis-y-validación)

---

## Objetivo

Levantar el entorno mínimo para el Detector y el agente ICARIA dentro del Space.

---

## Pasos rápidos

1. Copiar variables de entorno

```powershell
cp .env.sample .env
```

2. Levantar servicios (si aplica)

```powershell
docker-compose up -d
```

3. Revisar `agents/icaria-agent-config.yaml` y `docs/MEMORIA_AGENTE_ICARIA.md`.

---

## Herramientas recomendadas para optimizar el flujo de trabajo

Además de las herramientas básicas, se recomienda integrar las siguientes para mejorar la eficiencia y el monitoreo:

1. **Swagger/OpenAPI**
   - Documenta y prueba las APIs del MCP Server.
   - Facilita la colaboración y asegura que las APIs estén bien definidas.

2. **SonarQube**
   - Realiza análisis estático del código para detectar problemas de calidad y seguridad.
   - Garantiza un código limpio y mantenible.
   - Ejecuta análisis de calidad de código:
     ```bash
     sonar-scanner
     ```

3. **Grafana y Prometheus**
   - Monitorea el rendimiento del MCP Server y los contenedores.
   - Proporciona métricas en tiempo real para detectar problemas.

4. **Vault (HashiCorp)**
   - Gestiona de forma segura las credenciales y secretos necesarios para el proyecto.
   - Refuerza la seguridad del sistema.

5. **Redis o RabbitMQ**
   - Maneja colas de mensajes o caché para mejorar la comunicación entre servicios.
   - Aumenta la eficiencia y escalabilidad del sistema.

6. **Elastic Stack (ELK)**
   - Centraliza y analiza logs del MCP Server y otros servicios.
   - Facilita la depuración y el monitoreo.

7. **Terraform o Pulumi**
   - Automatiza la provisión de infraestructura como código (IaC).
   - Asegura consistencia y escalabilidad en entornos de desarrollo, prueba y producción.
   - Inicializa y aplica configuraciones de infraestructura:
     ```bash
     terraform init
     terraform apply
     ```

8. **Nginx o Traefik**
   - Optimiza el balanceo de carga y el enrutamiento entre servicios.
   - Mejora la distribución del tráfico y asegura un enrutamiento eficiente.

---

## Comandos útiles para tareas de KPIs y validación

```powershell
# Parche rápido si el resumen JSON está mal formado
python Detector/scripts/fix_json_summary.py

# Generar KPIs combinados (genera MD + CSV en Detector/reglas/Kpis)
python Detector/scripts/generate_kpis_combined.py

# Evaluar catálogo de reglas y escribir `condiciones_with_rules.csv`
python Detector/scripts/evaluate_rules.py
```
