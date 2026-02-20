
# MEMORIA DEL AGENTE ICARIA

## Índice

- [Propósito y alcance](#1-propósito-y-alcance)
- [Tecnologías, infra y herramientas imprescindibles](#2-tecnologías-infra-y-herramientas-imprescindibles)
- [Flujo entre VS Code y GitHub Space](#3-flujo-entre-vs-code-y-github-space)
- [Roles y responsabilidades](#4-roles-y-responsabilidades)
- [Instrucciones de actualización y control de calidad](#5-instrucciones-de-actualización-y-control-de-calidad)
- [Frase normativa final](#6-frase-normativa-final)

**Nota importante:** Asegúrate de descargar e instalar los programas necesarios mencionados en la [Guía de Integración de Programas y Herramientas](./Guia_Integracion_Programas.md). Esto incluye herramientas como Swagger/OpenAPI, SonarQube, Grafana, Prometheus, entre otros.

**Índice**

1. [Propósito y alcance](#1-propósito-y-alcance)
2. [Tecnologías, infra y herramientas imprescindibles](#2-tecnologías-infra-y-herramientas-imprescindibles)
3. [Flujo entre VS Code y GitHub Space](#3-flujo-entre-vs-code-y-github-space)
4. [Roles y responsabilidades](#4-roles-y-responsabilidades)
5. [Instrucciones de actualización y control de calidad](#5-instrucciones-de-actualización-y-control-de-calidad)

---

## 1. **Propósito y alcance**

MEMORIA_AGENTE_ICARIA.md es el archivo central donde:

- Se convergen todos los conocimientos, reglas de negocio, criterios técnicos y normativos para ICARIA.
- El agente IA de Copilot Space accede a la información, la consulta, la ejecuta y la mantiene “viva”.
- Se documentan cada decisión y evolución técnica del espacio, incluyendo preguntas, respuestas, casos de negocio, KPIs, reglas de validación, scripts, automatismos, ejemplos y test unitarios.
- Sirve de auditoría, referente técnico, onboarding, control de calidad y compatibilidad para todo colaborador del repositorio y del Space.

---

## 2. **Tecnologías, infra y herramientas imprescindibles**

- **GitHub Copilot Space**: Espacio colaborativo donde el agente reside, con subidas automáticas de archivos y memoria persistente.
- **Copilot Agent**: Instancia IA configurada/fija, conectada a la memoria y archivos de conocimiento del Space, activa en todo momento.
- **Docker Desktop**: Entorno de contenedores, ejecución de todos los servicios (MCP Server, agent, microservicios, persistencia).
- **MCP Server**: Microservicio obligatorio para procesamiento, validación, auditoría y comunicación entre módulos y la IA, en modo API REST o websocket.
- **VS Code**: Editor unificado para trabajar en el Space, con extensiones Copilot, Docker y GitHub Spaces, con acceso a chat, scripts, código, validadores, y control del repositorio.
- **Git**: Control de versiones, requirement técnico, gestión de branches, commits, merges y auditoría.
- **Node.js/NPM**: Instalación y gestión de dependencias principales, scripts de validación y utilidades de integración entre la lógica de negocio y la memoria.
- **Postman**: Herramienta para testeo y validación de endpoints MCP obligatoria para QA.
- **GitHub Actions**: Automatización de CI/CD, backups de memoria, generación de releases.
- **Terraform**: Herramienta para la provisión de infraestructura como código.
- **SonarQube**: Análisis de calidad de código para garantizar estándares altos.

---

## 3. **Flujo entre VS Code y GitHub Space**

El flujo operativo entre Visual Studio Code y GitHub Space con el agente persistente de Copilot se detalla a continuación:

1. **Inicio en VS Code**
   - Abrir el proyecto en VS Code, asegurándose de que las extensiones necesarias estén instaladas:
     - GitHub Copilot.
     - Docker.
     - GitHub Spaces.

2. **Conexión con el GitHub Space**
   - Configurar la conexión con el GitHub Space desde VS Code:
     - Autenticarse con GitHub.
     - Sincronizar el repositorio local con el Space.

3. **Edición y soporte del agente**
   - Trabajar en el código con el soporte del agente de Copilot:
     - Generar código, resolver dudas y recibir sugerencias en tiempo real.
     - Consultar la memoria persistente del proyecto directamente desde el Space.

4. **Validación local**
   - Ejecutar scripts y pruebas unitarias localmente en VS Code.
   - Usar Docker para levantar servicios necesarios (MCP Server, bases de datos, etc.).

5. **Sincronización con el Space**
   - Subir cambios al GitHub Space:
     - Crear ramas para nuevas características.
     - Realizar commits y sincronizar con el repositorio remoto.

6. **Revisión y colaboración**
   - Abrir Pull Requests desde VS Code para revisión en el Space.
   - Colaborar con el equipo utilizando las herramientas de GitHub integradas.

7. **Automatización y despliegue**
   - Usar GitHub Actions para validar y desplegar los cambios.
   - Monitorear el estado del despliegue desde el Space.

8. **Actualización de la memoria persistente**
   - Registrar decisiones, cambios y flujos en los archivos de memoria (`MEMORIA_AGENTE_ICARIA.md`, `memoria_chat.md`).

---

## 4. **Roles y responsabilidades**

- **AntonioRodriguezSmith** – Coordinador técnico y responsable de la memoria inicial.
- **Equipo DXC-TDM / Banco Sabadell** – Colaboradores, validadores y auditores técnicos.
- **Responsable del Agent** – Configuración, actualización y supervisión de la memoria.
- **QA y Auditoría** – Registro permanente en docs/checklist-equipo.md y memoria_chat.md.

---

## 5. **Instrucciones de actualización y control de calidad**

- Actualizar MEMORIA_AGENTE_ICARIA.md tras cada cambio técnico, flujo, caso, KPI, regla o decisión relevante.
- Realizar commit y push tras cada registro, validación o actualización.
- Mantener el checklist de equipo actualizado.
- Auditar y revisar la memoria cada semana y tras cada release.
- Los scripts de validación deben documentarse (lógica, inputs/outputs, excepciones).

---

## 6. **Frase normativa final**

**Este documento es el único punto de referencia obligatorio para el funcionamiento, auditoría y evolución del Agente ICARIA. Nada aquí es opcional, y toda la información aquí contenida debe servir a cualquier colaborador, auditor o responsable para entender, utilizar, mejorar y validar el proyecto sin necesidad de preguntar ni buscar información adicional.**

---

**Última actualización:** 19-02-2026
