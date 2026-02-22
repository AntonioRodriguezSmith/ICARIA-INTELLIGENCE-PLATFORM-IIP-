# ICARIA Intelligence Platform

**Repositorio confidencial para Banco Sabadell S.A.**  
Desarrollador principal: Antonio Rodriguez Smith (DXC Technology)  
Contacto: icaria-platform@dxc.com

---

## Descripción

ICARIA Intelligence Platform es una solución avanzada para el análisis y validación de operaciones BROKER frente a condiciones regulatorias. Proporciona herramientas automatizadas para detectar brechas regulatorias, facilitar auditorías y optimizar la toma de decisiones. Además, incluye memoria digital y explicaciones basadas en IA para garantizar trazabilidad y transparencia.

---

## Estado del Proyecto

- **Versión Actual:** 2.3.0
- **Estado:** Activo, confidencial, en desarrollo continuo.

---

## ✅ Lista de Tareas Pendientes

- [x] Instalar dependencias de Python desde `requirements.txt`
- [x] Configurar el entorno virtual para Python
- [x] Instalar y configurar pre-commit con `.pre-commit-config.yaml`
- [ ] Configurar automatización para subidas al repositorio
- [ ] Revisar nuevos programas para implementar
- [ ] Implementar cambios después de organizar el repositorio
- [ ] Validar la configuración de las herramientas de análisis estático (Black, isort, pylint)
- [ ] Actualizar la documentación técnica en `/docs` para reflejar los cambios recientes
- [ ] Revisar y probar los scripts en `scripts/` para asegurar su funcionalidad
- [ ] Documentar cualquier problema o decisión en `.memoria/conversaciones.json`

---

## 🗂 Estructura del Proyecto

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

## 🚀 Instalación y Uso

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

**Contacto:** icaria-platform@dxc.com