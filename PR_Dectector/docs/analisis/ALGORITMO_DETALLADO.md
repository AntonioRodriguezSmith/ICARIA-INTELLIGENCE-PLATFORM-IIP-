# Guía Detallada del Motor de Matching Inteligente

## Índice

1. [Introducción](#introducción)
2. [Condiciones Modeladas](#condiciones-modeladas)
   - [Estructura de las Condiciones](#estructura-de-las-condiciones)
   - [Ejemplos de Condiciones](#ejemplos-de-condiciones)
3. [Funciones Principales](#funciones-principales)
   - [parseoCasosBroker](#parseocasosbroker)
   - [parseoCondicionesIcaria](#parseocondicionesicaria)
   - [matchingInteligente](#matchinginteligente)
   - [calculoScoring](#calculoscoring)
   - [analizarCasos](#analizarcasos)
   - [generacionReporte](#generacionreporte)
4. [Algoritmo de Matching](#algoritmo-de-matching)
   - [Patrones y Keywords](#patrones-y-keywords)
   - [Similitud de Texto](#similitud-de-texto)
5. [Generación de Reportes](#generación-de-reportes)
6. [Estadísticas y Métricas](#estadísticas-y-métricas)
7. [Ejemplo de Uso](#ejemplo-de-uso)
8. [Errores Comunes y Soluciones](#errores-comunes-y-soluciones)

---

## Introducción

El motor de matching inteligente es el núcleo del sistema de análisis de casos Broker contra condiciones ICARIA. Utiliza algoritmos avanzados de coincidencia, incluyendo patrones regex, búsqueda por palabras clave y similitud de texto, para determinar la cobertura de cada caso.

---

## Condiciones Modeladas

### Estructura de las Condiciones
Cada condición modelada incluye los siguientes atributos:

- **Código**: Identificador único de la condición.
- **Nombre**: Descripción breve de la condición.
- **Dominio**: Categoría a la que pertenece (e.g., OPERATIVA, REGULATORIO).
- **Descripción**: Explicación detallada de la condición.
- **Keywords**: Palabras clave asociadas.
- **Pattern**: Expresión regular para coincidencias exactas.
- **Casos Afectados**: Número de casos relacionados.
- **Porcentaje**: Porcentaje de cobertura.

### Ejemplos de Condiciones

1. **Test Divisa EUR**
   - Código: `TEST_DIVISA_EUR`
   - Dominio: OPERATIVA
   - Keywords: `['divisa', 'eur', 'euro', 'moneda', 'currency']`
   - Pattern: `/\b(divisa|currency)\s*(=|:)?\s*eur\b/i`

2. **Saldo DV01 > 1.000€**
   - Código: `SALDO_DV01`
   - Dominio: RIESGO
   - Keywords: `['saldo', 'dv01', '1000', '1.000', 'mayor', 'superior']`
   - Pattern: `/\b(saldo\s*dv01|dv01)\s*(>|>=|mayor|superior)\s*(1\.?000|1000)\s*€?\b/i`

---

## Funciones Principales

### parseoCasosBroker

- **Descripción**: Parsea un archivo Markdown con casos Broker.
- **Parámetros**:
  - `contenidoMD`: Contenido del archivo Markdown.
- **Salida**: Array de objetos caso con ID, descripción y condiciones aplicadas.

### parseoCondicionesIcaria

- **Descripción**: Parsea un archivo TXT con condiciones ICARIA.
- **Parámetros**:
  - `contenidoTXT`: Contenido del archivo TXT.
- **Salida**: Array de condiciones con dominio, keywords y estado modelado.

### matchingInteligente

- **Descripción**: Realiza el análisis entre casos y condiciones.
- **Parámetros**:
  - `caso`: Caso a analizar.
  - `condicionesICARIA`: Condiciones disponibles.
- **Salida**: Resultado del matching con scoring y estado.

### calculoScoring

- **Descripción**: Calcula el puntaje de cobertura basado en coincidencias.
- **Parámetros**:
  - `coincidencias`: Coincidencias encontradas.
  - `totalCondiciones`: Total de condiciones evaluadas.
- **Salida**: Scoring entre 0 y 100.

### analizarCasos

- **Descripción**: Analiza múltiples casos y genera un reporte completo.
- **Parámetros**:
  - `casos`: Array de casos a analizar.
  - `condicionesICARIA`: Condiciones disponibles.
- **Salida**: Reporte con estadísticas y resultados detallados.

### generacionReporte

- **Descripción**: Genera un informe detallado del análisis.
- **Parámetros**:
  - `analisis`: Resultado del análisis.
- **Salida**: Objeto con resumen ejecutivo, distribución y gaps detectados.

---

## Algoritmo de Matching

### Patrones y Keywords
El motor utiliza expresiones regulares y palabras clave para identificar coincidencias exactas y aproximadas.

### Similitud de Texto
Se calcula un porcentaje de similitud entre el texto del caso y las condiciones, utilizando algoritmos de fuzzy matching.

---

## Generación de Reportes

El motor genera reportes con:

- Resumen ejecutivo.
- Distribución de estados (Modelada, Parcial, No Modelada).
- Condiciones más frecuentes.
- Gaps detectados.
- Detalles por caso.

---

## Estadísticas y Métricas

- **Cobertura Promedio**: Porcentaje promedio de condiciones encontradas.
- **Distribución por Dominio**: Clasificación de condiciones por categoría.
- **Top Condiciones**: Condiciones más frecuentes en los casos analizados.

---

## Ejemplo de Uso

```javascript
const casos = parseoCasosBroker(contenidoMarkdown);
const condiciones = parseoCondicionesIcaria(contenidoTXT);
const reporte = analizarCasos(casos, condiciones);
console.log(generacionReporte(reporte));
```

---

## Errores Comunes y Soluciones

1. **Error: Contenido vacío**
   - **Causa**: Archivos de entrada sin datos.
   - **Solución**: Verificar que los archivos no estén vacíos.

2. **Error: Condiciones no encontradas**
   - **Causa**: Falta de coincidencias en patrones o keywords.
   - **Solución**: Revisar la configuración de las condiciones modeladas.

---

Esta guía proporciona una referencia completa para entender y utilizar el motor de matching inteligente. Para más detalles, consulta el código fuente o contacta al equipo de desarrollo.