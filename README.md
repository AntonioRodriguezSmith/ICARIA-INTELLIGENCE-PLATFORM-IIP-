

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

- **Versión Actual:** 2.3.0
- **Estado:** Activo, confidencial, en desarrollo continuo.

---

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

## Tecnologías y Dependencias

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

**Contacto:** icaria-platform@dxc.com