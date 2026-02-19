# 🤝 Guía de Contribución

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
