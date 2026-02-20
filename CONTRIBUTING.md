
# 🤝 Guía de Contribución

## Índice

- [Importante](#️-importante)
- [Proceso de Contribución](#proceso-de-contribución)
- [Estándares de Código](#estándares-de-código)
- [Estructura de Archivos](#estructura-de-archivos)
- [Documentación](#documentación)
- [Testing](#testing)
- [Revisión de Código](#revisión-de-código)
- [Guía para contribuir](#guía-para-contribuir)
- [Reglas de estilo](#reglas-de-estilo)
- [Reportar problemas](#reportar-problemas)

## ⚠️ Importante

Este es un proyecto **CONFIDENCIAL** de Banco Sabadell S.A.

Solo personal autorizado puede contribuir.

## Proceso de Contribución

### 1. Crear una Rama

```bash
git checkout -b feature/nombre-descriptivo
```

### 2. Realizar Cambios

- Seguir estándares de código
- Añadir comentarios en español
- Documentar funciones complejas

### 3. Commit

```bash
git add .
git commit -m "tipo: descripción breve

Descripción detallada del cambio"
```

**Tipos de commit:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato, punto y coma, etc
- `refactor`: Refactorización de código
- `test`: Añadir tests
- `chore`: Mantenimiento

### 4. Push y Pull Request

```bash
git push IIP feature/nombre-descriptivo
```

Crear Pull Request con:
- Título descriptivo
- Descripción detallada
- Referencias a issues si aplica

### 5. Verificación de Estilo y Calidad

Antes de realizar un commit, asegúrate de ejecutar las herramientas de análisis estático:

```bash
git pre-commit run --all-files
```

Esto verificará el formato del código con Black, el orden de importaciones con isort y posibles errores con pylint.

## Estándares de Código

### JavaScript

```javascript
/**
 * Descripción de la función
 * @param {tipo} nombreParametro - Descripción
 * @returns {tipo} Descripción del retorno
 */
function nombreFuncion(nombreParametro) {
    // Código aquí
}
```

### CSS

```css
/* Usar variables de Banco Sabadell */
.componente {
    color: var(--sabadell-azul-principal);
    background: var(--sabadell-gris-claro);
}
```

## Estructura de Archivos

Mantener organización:
```
src/js/
├── core/          # Lógica principal
├── modulos/       # Módulos independientes
├── utilidades/    # Funciones auxiliares
└── config/        # Configuración
```

## Documentación

- Actualizar README.md si es necesario
- Añadir entrada en CHANGELOG.md
- Documentar en `/docs` si es funcionalidad nueva

## Testing

Antes de hacer commit:
1. Probar con datos reales
2. Verificar en diferentes navegadores
3. Comprobar responsive design
4. Validar exportaciones (MD/PDF)

## Revisión de Código

Todo código debe ser revisado por:
- Líder técnico del proyecto
- Responsable de seguridad (si afecta datos)

## Contacto

Dudas o consultas: icaria-platform@dxc.com

---

# Guía para contribuir

Gracias por tu interés en contribuir a este proyecto. Sigue estas pautas para garantizar un proceso de contribución eficiente y organizado.

## Cómo contribuir

1. **Fork el repositorio**: Crea una copia del repositorio en tu cuenta de GitHub.
2. **Clona el repositorio**: Descarga el repositorio a tu máquina local.
   ```bash
   git clone https://github.com/tu-usuario/ICARIA-INTELLIGENCE-PLATFORM.git
   ```
3. **Crea una rama**: Trabaja en una nueva rama para tus cambios.
   ```bash
   git checkout -b nombre-de-tu-rama
   ```
4. **Realiza cambios**: Asegúrate de seguir las convenciones de codificación del proyecto.
5. **Confirma tus cambios**: Escribe mensajes de commit claros y descriptivos.
   ```bash
   git commit -m "Descripción de los cambios"
   ```
6. **Envía un Pull Request**: Sube tus cambios y crea un Pull Request en el repositorio original.

## Reglas de estilo
- Sigue las convenciones de codificación definidas en el proyecto.
- Asegúrate de que tu código pase las pruebas existentes.

## Reportar problemas
Si encuentras un error o tienes una sugerencia, abre un Issue en el repositorio.

¡Gracias por tu contribución!
