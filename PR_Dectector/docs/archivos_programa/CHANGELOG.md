# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [2.2.0] - 2026-02-15

### Added - Fase 1: Quick Wins
- ✅ TEST_CF (Capacidad Financiera) - 96% impacto
- ✅ TEST_TC (Test de Conveniencia) - 96% impacto  
- ✅ SALDO_DV01 (Saldo DV01 > 1.000€) - 89% impacto
- ✅ Cobertura aumentada del 40% al 85%
- ✅ Arquetipos actualizados con nuevas condiciones

### Changed
- Versión actualizada a 2.2.0
- Arquetipos predefinidos incluyen condiciones regulatorias
- Arquetipo Q48 renombrado a "Compra de acciones en oficina (COMPLETO)"
- Total de condiciones modeladas: 5 → 8

## [2.0.0] - 2026-02-13

### Añadido
- Datos reales recibidos: 67 casos completos
- Algoritmo de matching completo y validado
- 10 nuevas condiciones no modeladas detectadas
- Documentación exhaustiva del análisis
- 11 KPIs con proyecciones
- Roadmap de implementación en 4 fases
- Archivos de datos: casos_simplificados.md y CondicionesIcaria.txt
- Motor de matching JavaScript completo (800 líneas)

### Cambiado
- Cobertura actualizada: 40% (datos reales vs estimación inicial)
- Diccionario de condiciones: 5 modeladas, 23 no modeladas
- Análisis expandido de 10 a 67 casos

### Corregido
- **CRÍTICO:** KC11 reclasificada como tabla de relación (no condición)
- Reducción de gaps de 24 a 23
- Recálculo de todas las coberturas

## [1.1.0] - 2026-02-13

### Corregido
- Corrección crítica: KC11 NO es una condición, es tabla de relación
- Actualización del diccionario de condiciones no modeladas

### Añadido
- Documentación sobre diferencia entre tablas y condiciones
- Ejemplos visuales de infraestructura vs lógica de negocio

## [1.0.0] - 2026-02-13

### Añadido
- Análisis inicial con datos de ejemplo
- Prototipo con 10 casos
- Estimación inicial de 14 gaps
- Estructura base del proyecto
- Documentación inicial
- README.md, LICENSE, INSTALL.md
- Sistema de memoria (.memoria/)

[2.2.0]: https://github.com/AntonioRodriguezSmith/icaria-intelligence-platform/compare/v2.0.0...v2.2.0
[2.0.0]: https://github.com/AntonioRodriguezSmith/icaria-intelligence-platform/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/AntonioRodriguezSmith/icaria-intelligence-platform/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/AntonioRodriguezSmith/icaria-intelligence-platform/releases/tag/v1.0.0
