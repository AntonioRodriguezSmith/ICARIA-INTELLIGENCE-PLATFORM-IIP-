
# Checklist del entorno — Spaces + Agent + Docker + MCP + VSCode

## Índice

- [Imprescindibles](#imprescindibles)
- [Herramientas recomendadas](#herramientas-recomendadas)
- [Regenerar KPIs localmente](#regenerar-kpis-localmente)

[Volver a la memoria del agente ICARIA](./MEMORIA_AGENTE_ICARIA.md)

---

**Nota:** Descarga e instala los programas necesarios mencionados en la [Guía de Integración de Programas y Herramientas](./Guia_Integracion_Programas.md) antes de continuar.

---

**Imprescindibles**

- **GitHub Copilot Space con Agent**

- Asegúrate de tener acceso al Space y configurar correctamente el Agent (con documentación, archivos de reglas/casos/KPI).
- Si el Agent requiere configuración YAML/JSON específica, súbela al Space/repositorio.

Docker Desktop

- Instala Docker Desktop (última versión).
- Verifica que puedes correr contenedores y manejar imágenes localmente.
- Si el Agent necesita algún microservicio (API, backend, db, etc.), define el Dockerfile y/o `docker-compose.yml` según instrucciones del Agent.

MCP Server

- MCP Server corriendo en local o conectado en red según la arquitectura de tu proyecto.
- Puertos abiertos y configurados según necesidades (por ejemplo: 8080, 3000, etc.).
- Si necesitas conexión con repositorios privados, verifica credenciales y tokens.

VS Code

- Instala VS Code (actualizado).
- Instala extensiones:
  - GitHub Copilot y Copilot Chat
  - Docker (para visualizar y manejar contenedores)
  - GitHub Spaces (si existe/está disponible) o usar el acceso web
  - Remote Containers / Dev Containers (si trabajas con Docker como entorno)
- Configura workspace para tu Space/repositorio.

---

**Herramientas recomendadas**

- **Swagger/OpenAPI**: Documenta y prueba las APIs del MCP Server.
- **SonarQube**: Realiza análisis estático del código para garantizar calidad y seguridad.
- **Grafana y Prometheus**: Monitorea el rendimiento del MCP Server y los contenedores.
- **Vault (HashiCorp)**: Gestiona credenciales y secretos de forma segura.
- **Redis o RabbitMQ**: Mejora la comunicación entre servicios mediante colas de mensajes o caché.
- **Elastic Stack (ELK)**: Centraliza y analiza logs del MCP Server y otros servicios.
- **Terraform o Pulumi**: Automatiza la provisión de infraestructura como código.
- **Nginx o Traefik**: Optimiza el balanceo de carga y el enrutamiento entre servicios.

---

**Regenerar KPIs localmente**

Si necesitas regenerar los KPIs o repetir la validación localmente, los scripts y el flujo son:

```powershell
# (1) Parche rápido si el resumen JSON está mal formado
python Detector/scripts/fix_json_summary.py

# (2) Generar KPIs combinados (MD + CSV)
python Detector/scripts/generate_kpis_combined.py

# (3) Evaluar catálogo de reglas y producir `condiciones_with_rules.csv`
python Detector/scripts/evaluate_rules.py
```

---

**CI / Automatización**

- Existe un workflow `.github/workflows/kpi_generation.yml` que ejecuta el parse y la generación de KPIs y sube los artefactos. Útil para validar cambios en PRs.
- Asegúrate de incluir `requirements.txt` en el entorno si ejecutas los scripts en CI local.

---

**Flujo típico con tu stack**

1. Subes/cargas archivos en el Space/repositorio.
2. El Agent los indexa y los usa como memoria.
3. Interactúas desde VS Code/Spaces (chat, generación, revisión).
4. Procesas/analizas casos con el Agent (agente IA con memoria persistente).
5. Si necesitas más funcionalidad, lanzas containers Docker (servicios, bases de datos, endpoints AI, etc.).
6. Automatizas workflows/manuales/QA vía MCP Server (para validaciones, despliegues, etc.).

---

**Resumen**

Con Copilot Space, Agent, Docker Desktop, MCP Server y VS Code tienes todo el entorno colaborativo, programable y persistente para tu proyecto. Además, las herramientas recomendadas optimizan el flujo de trabajo y garantizan la calidad del sistema.
