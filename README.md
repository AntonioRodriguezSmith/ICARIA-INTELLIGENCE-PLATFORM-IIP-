# ICARIA Intelligence Platform (ICC)

- Custom Apps Banc Sabadell Testing
  - Manuel Gil  
    manuel.gil@dxc.com

- Desarrollador jefe
  - Antonio Rodriguez Smith  
    a.rodriguezsmith@dxc.com

---

# ICARIA Intelligence Platform

**Repositorio confidencial para Banco Sabadell S.A.**  
Desarrollador principal: Antonio Rodriguez Smith (DXC Technology)  
Contacto: icaria-platform@dxc.com

---

## Descripción

ICARIA Intelligence Platform es una solución avanzada para el análisis y validación de operaciones BROKER frente a condiciones regulatorias. Proporciona herramientas automatizadas para detectar brechas regulatorias, facilitar auditorías y optimizar la toma de decisiones. Además, incluye memoria digital y explicaciones basadas en IA para garantizar trazabilidad y transparencia.

---

## Estado del Proyecto

- **Versión Actual:** 2.3.1
- **Estado:** Activo, confidencial, en desarrollo continuo.

---

## Principales Tecnologías y Herramientas

- Visual Studio Code (IDE principal)
- GitHub Copilot (IA para autocompletado y generación de código, basado en GPT-4.1)
- GitHub Spaces (colaboración, revisión y memoria persistente)
- Docker Desktop (contenedores y despliegue)
- MCP Server (motor de reglas y validación)
- Node.js/NPM (scripts y utilidades)
- Postman (testing de APIs)
- GitHub Actions (automatización CI/CD)
- Terraform (infraestructura como código)
- SonarQube (análisis estático)
- Python (scripts, automatización y análisis)
- Bootstrap, jQuery, Chart.js, DataTables, jsPDF (frontend y visualización)

---

## Flujo Técnico Integrado

1. Preparación del entorno:
   - VS Code + extensiones (Docker, Remote Containers, Copilot, GitHub Spaces)
   - Configuración de entorno virtual Python y dependencias
2. Autenticación y conexión:
   - GitHub para control de versiones, CI/CD y autenticación Copilot
3. Desarrollo y automatización:
   - Copilot genera funciones, scripts, workflows, comandos Docker/Terraform
   - Colaboración en GitHub Space, integración de memoria persistente y KPIs
   - Ejecución de scripts, validación de endpoints, monitoreo de métricas

---

## Memoria Persistente y Auditoría

- `.memoria/conversaciones.json`: registro de decisiones, problemas, evolución técnica
- `memoria_markdown/`: onboarding, control de calidad, compatibilidad, ejemplos y test unitarios
- KPIs, reglas de negocio, scripts y automatismos documentados

---

## Estructura del Proyecto

```
ICARIA-INTELLIGENCE-PLATFORM/PR_Detector
│
├── docs/
│   ├── agents/                # Scripts y herramientas auxiliares
│   ├── archivos_programa/     # Archivos del programa
│   ├── LICENSE                # Licencia del proyecto
│   └── memoria_persistente/   # Datos persistentes
│
├── nucleo/
│   ├── casos_broker/          # Casos relacionados con el broker
│   ├── condiciones/           # Condiciones ICARIA
│   └── reglas/                # Reglas del motor
│
├── scripts/
│   ├── evaluate_rules.py      # Evaluación de reglas
│   ├── fix_json_summary.py    # Corrección de JSON
│   ├── generate_full_summary_md.py # Generación de resumen completo
│   ├── generate_kpis_combined.py  # Generación de KPIs combinados
│   ├── parse_conditions.py    # Análisis de condiciones
│   ├── register_session.sh    # Registro de sesión
│   ├── __init__.py            # Inicialización del módulo
│   └── __pycache__/           # Archivos de caché
│
├── src/
│   ├── assets/                # Recursos estáticos
│   ├── js/                    # Archivos JavaScript
│   └── scripts/               # Scripts adicionales
```

---

## Instalación y Uso

1. **Requisitos:** Navegador moderno; librerías incluidas vía CDN (Bootstrap, jQuery, Chart.js, DataTables, jsPDF).
2. **Instalación:**
   - Clona el repositorio.
   - Abre `src/index.html` en tu navegador.
   - Para configuraciones avanzadas, edita:
     - `src/js/config/constantes.js` (constantes del sistema).
     - `src/js/core/motor-matching.js` (condiciones modeladas, thresholds, etc.).
3. **Uso básico:**
   - Sube el archivo de casos y observa análisis, scoring y brechas.
   - Usa arquetipos predefinidos o crea los tuyos.
   - Exporta y documenta resultados.

---

## Requisitos y dependencias

### Python
- black
- isort
- pytest
- pandas
- pyyaml
- requests
- flask
- sqlalchemy
- numpy
- fastapi
- uvicorn

Instalación:
```bash
pip install -r requirements.txt
```

### Node.js
- express
- dotenv
- typescript

Instalación:
```bash
npm install
```

### Docker
- Dockerfile y docker-compose.yml para despliegue de servicios

### CI/CD y automatización
- Workflows en .github/workflows/
- Scripts Python para automatización y análisis

### Variables de entorno
- Crear archivo `.env` para credenciales y configuración sensible

---

## Contacto y Soporte

- Email: icaria-platform@dxc.com
- Responsable: Antonio Rodriguez Smith (DXC Technology)
- Documentación técnica: `/docs`, `/memoria_markdown`, README global

---

## Créditos y Branding

- Proyecto desarrollado por DXC Technology para Banco Sabadell
- Branding corporativo: Banco Sabadell (#009ee3), DXC Technology
- Presentación ejecutiva disponible en HTML multi-pantalla (ver `presentacion_icaria_multi.html`)

---

## Notas Adicionales

- El repositorio está en desarrollo activo y confidencial.
- Todas las tareas técnicas y de documentación están actualizadas a 2026.
- Para integración con IA externa, consultar ejemplos en `/docs/archivos_programa/CopilotAgent/README.md`.
- Para visualización ejecutiva, usar la presentación HTML multi-screen.

---

## Pie de página ejecutivo DXC & SABADELL

DXC Technology & Banco Sabadell: colaboración en innovación, testing y desarrollo de soluciones bancarias avanzadas. ICC liderado por Antonio Rodriguez Smith (a.rodriguezsmith@dxc.com) y Manuel Gil (manuel.gil@dxc.com).

---

**Contacto:** icaria-platform@dxc.com