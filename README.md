<<<<<<< HEAD

=======
# ICARIA Intelligence Platform (ICC)

- Custom Apps Banc Sabadell Testing
  - Manuel Gil  
    manuel.gil@dxc.com

- Desarrollador jefe
  - Antonio Rodriguez Smith  
    a.rodriguezsmith@dxc.com

---
>>>>>>> copilot/revert-commit-4d0897b

# ICARIA Intelligence Platform

## Índice

- [Descripción General](#descripción-general)
- [Estado del Proyecto](#estado-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías y Dependencias](#tecnologías-y-dependencias)
- [Instalación y Primeros Pasos](#instalación-y-primeros-pasos)
- [Flujo de Trabajo Recomendado](#flujo-de-trabajo-recomendado)
- [Documentación Técnica y Recursos](#documentación-técnica-y-recursos)
- [Contacto](#contacto)

**Repositorio confidencial para Banco Sabadell S.A.**  
Desarrollador principal: Antonio Rodriguez Smith (DXC Technology)  
Contacto: icaria-platform@dxc.com

---

## Descripción General

ICARIA Intelligence Platform es una solución avanzada para el análisis y validación de operaciones BROKER frente a condiciones regulatorias. Integra automatización, memoria digital, IA explicativa y herramientas para auditoría, detección de brechas y optimización de decisiones.

---

## Estado del Proyecto

- **Versión Actual:** 2.3.1
- **Estado:** Activo, confidencial, en desarrollo continuo.

---

<<<<<<< HEAD
=======
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

>>>>>>> copilot/revert-commit-4d0897b
## Estructura del Proyecto

```
ICARIA-INTELLIGENCE-PLATFORM/PR_Detector
│
├── docs/
│   ├── analisis/                  # Documentación de algoritmos y flujos
│   ├── archivos_programa/         # Archivos de despliegue y flujos
│   └── memoria_persistente/       # Memoria digital, guías y checklists
│
├── nucleo/
│   ├── casos_broker/              # Casos de negocio y ejemplos
│   ├── condiciones/               # Condiciones ICARIA (csv, json, md)
│   └── reglas/                    # Catálogo de reglas y KPIs
│
├── scripts/
│   ├── evaluate_rules.py          # Evaluación de reglas
│   ├── fix_json_summary.py        # Corrección de JSON
│   ├── generate_full_summary_md.py# Generación de resumen completo
│   ├── generate_kpis_combined.py  # Generación de KPIs combinados
│   ├── parse_conditions.py        # Análisis de condiciones
│   └── register_session.sh        # Registro de sesión
│
├── src/
│   ├── assets/                    # Recursos estáticos (css, img, fuentes)
│   ├── js/                        # Lógica principal, módulos y utilidades
│   └── scripts/                   # Scripts adicionales
│
├── PR_Dectector/
│   ├── tsconfig.json              # Configuración TypeScript
│   └── src/                       # Código TypeScript
│
├── Dockerfile                     # Contenedor para entorno Python
├── requirements.txt               # Dependencias Python
├── package.json                   # Dependencias Node.js
├── CHANGELOG.md                   # Historial de cambios
├── CONTRIBUTING.md                # Guía de contribución
└── README.md                      # Este archivo
```

---

<<<<<<< HEAD
## Tecnologías y Dependencias
=======
## Instalación y Uso
>>>>>>> copilot/revert-commit-4d0897b

- **Python**: scripts de análisis, validación y generación de KPIs (`requirements.txt`)
- **Node.js/TypeScript**: lógica de matching, utilidades y scripts (`package.json`, `PR_Dectector/tsconfig.json`)
- **Docker**: despliegue y entorno reproducible (`Dockerfile`)
- **Herramientas recomendadas**: Swagger/OpenAPI, SonarQube, Grafana, Prometheus, Vault, Redis/RabbitMQ, ELK, Terraform, Nginx/Traefik (ver docs/HERRAMIENTAS_Y_PROGRAMAS.md)

---

## Instalación y Primeros Pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/AntonioRodriguezSmith/icaria-intelligence-platform.git
   cd icaria-intelligence-platform
   ```
2. **Python:**
   - Crea un entorno virtual y ejecuta:
     ```bash
     pip install -r requirements.txt
     ```
   - Ejecuta scripts desde la carpeta `scripts/` según la [Guía Rápida](PR_Dectector/docs/memoria_persistente/memoria_markdown/Guia_Rapida.md).
3. **Node.js/TypeScript:**
   - Instala dependencias:
     ```bash
     npm install
     ```
   - Compila TypeScript en `PR_Dectector/`:
     ```bash
     npx tsc --project PR_Dectector/tsconfig.json
     ```
4. **Docker (opcional):**
   - Construye y ejecuta el contenedor:
     ```bash
     docker build -t icaria .
     docker run -p 5000:5000 icaria
     ```
5. **Configuración avanzada y herramientas:**
   - Consulta la [Guía de Integración de Programas](PR_Dectector/docs/memoria_persistente/memoria_markdown/Guia_Integracion_Programas.md) y el [Checklist de Entorno](PR_Dectector/docs/memoria_persistente/memoria_markdown/ENV_CHECKLIST.md).

---

## Flujo de Trabajo Recomendado

1. Instala dependencias y configura el entorno (Python, Node.js, Docker).
2. Ejecuta scripts de análisis y validación desde `scripts/`.
3. Usa los comandos útiles de la [Guía Rápida](PR_Dectector/docs/memoria_persistente/memoria_markdown/Guia_Rapida.md).
4. Documenta decisiones y problemas en la memoria digital (`memoria_json/conversaciones.json`).
5. Mantén la documentación y checklists actualizados tras cada cambio.

---

## Documentación Técnica y Recursos

- [Guía Detallada del Algoritmo de Matching](PR_Dectector/docs/analisis/ALGORITMO_DETALLADO.md)
- [Memoria del Agente ICARIA](PR_Dectector/docs/memoria_persistente/memoria_markdown/MEMORIA_AGENTE_ICARIA.md)
- [Guía Rápida de Uso](PR_Dectector/docs/memoria_persistente/memoria_markdown/Guia_Rapida.md)
- [Herramientas y Programas](PR_Dectector/docs/memoria_persistente/memoria_markdown/HERRAMIENTAS_Y_PROGRAMAS.md)
- [Guía de Integración de Programas](PR_Dectector/docs/memoria_persistente/memoria_markdown/Guia_Integracion_Programas.md)
- [Checklist de Entorno](PR_Dectector/docs/memoria_persistente/memoria_markdown/ENV_CHECKLIST.md)
- [Checklist de Equipo](PR_Dectector/docs/memoria_persistente/memoria_markdown/checklist-equipo.md)

---


---

## Pruebas automáticas (Testing)

El proyecto utiliza [Mocha](https://mochajs.org/) como framework de testing para Node.js.

### Ejecutar los tests

1. Asegúrate de tener las dependencias instaladas:
    ```bash
    npm install
    ```
2. Ejecuta todos los tests:
    ```bash
    npm test
    ```

Los tests se encuentran en la carpeta `/test` y cualquier archivo con extensión `.test.js` será ejecutado automáticamente.

Ejemplo de test:
```js
// test/example.test.js
const assert = require('assert');
describe('Demo Test', function() {
   it('should return true', function() {
      assert.strictEqual(true, true);
   });
});
```

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