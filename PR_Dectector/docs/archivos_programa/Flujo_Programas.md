# Flujo Operativo entre Programas y Herramientas

Este documento describe el flujo operativo entre los programas y herramientas utilizados en el proyecto ICARIA Intelligence Platform.

---

## 1. **Inicio del Proyecto**

1. **Clonación del Repositorio**:
   - Se clona el repositorio desde GitHub utilizando Git o GitHub Desktop.
   ```bash
   git clone <URL del repositorio>
   ```

2. **Configuración del Entorno**:
   - Se copian las variables de entorno desde `.env.sample` a `.env`.
   ```bash
   cp .env.sample .env
   ```
   - Se configuran las credenciales necesarias para el acceso a servicios externos.

---

## 2. **Ejecución de Servicios**

1. **Docker**:
   - Se utiliza Docker para levantar los servicios necesarios.
   ```bash
   docker-compose up -d
   ```
   - Servicios incluidos:
     - MCP Server
     - Bases de datos
     - Microservicios adicionales

2. **Visual Studio Code**:
   - Se utiliza como entorno principal de desarrollo.
   - Extensiones recomendadas:
     - GitHub Copilot
     - Docker
     - Remote Containers

---

## 3. **Automatización y Validación**

1. **Scripts Python**:
   - Scripts clave para la generación de KPIs y validación de reglas:
     ```bash
     python src/scripts/fix_json_summary.py
     python src/scripts/generate_kpis_combined.py
     python src/scripts/evaluate_rules.py
     ```

2. **GitHub Actions**:
   - Automatización de tareas como generación de artefactos y validación continua.

---

## 4. **Documentación y Memoria**

1. **Actualización de Documentos**:
   - Se actualizan los archivos en `/docs` y `.memoria/` con cada cambio relevante.

2. **Registro de Decisiones**:
   - Se documentan decisiones clave en `.memoria/conversaciones.json`.

---

## 5. **Ciclo de Validación y QA**

1. **Testing**:
   - Pruebas unitarias y de integración utilizando `pytest`.
   ```bash
   pytest
   ```

2. **Auditoría**:
   - Revisión semanal de artefactos generados y cumplimiento de estándares.

---

## 6. **Despliegue**

1. **Preparación**:
   - Validación de confidencialidad y control de acceso.

2. **Despliegue**:
   - Uso de herramientas como Terraform o Pulumi para la provisión de infraestructura.

---

## 7. **Estructura de Archivos y Carpetas**

Todo el conocimiento se gestiona en la siguiente estructura estricta:

```
/
├── docker-compose.yml                # Orquestación estricta de contenedores obligatorios
├── config/agents/
│   └── icaria-agent-config.yaml      # Configuración completa de Copilot Agent
├── docs/
│   ├── MEMORIA_AGENTE_ICARIA.md      # Este archivo, memoria viva y normativa
│   ├── Guia_Rapida.md                # Guía operativa, detallada para el equipo
│   ├── checklist-equipo.md           # Checklist estructurado para onboarding y revisión continua
│   └── memoria_chat.md               # Registro de conversaciones, decisiones, dudas y respuestas de chat
├── reglas/
│   ├── kpis.md                       # KPIs y criterios medibles de negocio
│   ├── condiciones.md                # Reglas de negocio por condición/caso
│   └── ejemplos_validacion.md        # Ejemplos de validaciones automáticas y scripts
├── casos/
│   ├── casos_simplificados.md        # Casos básicos y normativos de ICARIA
│   ├── casos_avanzados.md            # Casos complejos, edge cases
│   └── casos_test.md                 # Casos de test unitarios y automatismos
└── .env                              # Variables de entorno obligatorias
```

- Todos los archivos normativos y operativos deben versionarse y actualizarse en cada cambio relevante.
- Ninguna carpeta ni archivo aquí es opcional; todos son parte del diseño.

---

## 8. **Cambios Recientes**

Resumen de artefactos y scripts añadidos en esta sesión:

- `parse_conditions.py` — parsea `ejemplos_validacion.md` y genera `condiciones_desglose.{md,csv}`.
- `generate_kpis_combined.py` — genera `kpis_combined.md` y `kpis_combined.csv` a partir del resumen JSON y desglose.
- `evaluate_rules.py` — marca condiciones que figuran en `rules_catalog.md` y escribe `condiciones_with_rules.csv`.
- `fix_json_summary.py` — herramienta rápida para corregir coma faltante en `ejemplos_validacion_summary.json`.

Artefactos generados:

- `kpis_combined.md`, `kpis_combined.csv` — KPIs combinados (casos y condiciones).
- `condiciones_desglose.md`, `condiciones_desglose.csv` — desglose por condición.
- `condiciones_with_rules.csv` — desglose con marca de catálogo de reglas.
- `kpis_cases_summary.csv` — resumen por caso (67 casos).

---

**Nota:** Este flujo debe revisarse y actualizarse periódicamente para reflejar cambios en el proyecto.