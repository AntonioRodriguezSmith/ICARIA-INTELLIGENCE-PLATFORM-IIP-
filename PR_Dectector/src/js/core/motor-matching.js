/**
 * ICARIA Intelligence Platform - Motor de Matching Inteligente
 * 
 * Motor de análisis que compara casos Broker contra condiciones ICARIA
 * Utiliza algoritmos de fuzzy matching y scoring para determinar cobertura
 * 
 * @version 2.0.0
 * @author Antonio Rodriguez Smith - DXC Technology
 * @client Banco Sabadell S.A. - TDM Department
 * @confidential
 */

/**
 * Condiciones ICARIA ya modeladas en el sistema
 * Basado en análisis real de 67 casos
 */
const CONDICIONES_MODELADAS = {
    TEST_DIVISA_EUR: {
        codigo: 'TEST_DIVISA_EUR',
        nombre: 'Test Divisa EUR',
        dominio: 'OPERATIVA',
        parametrizable: false,
        descripcion: 'Verifica que la divisa de la operación sea EUR',
        keywords: ['divisa', 'eur', 'euro', 'moneda', 'currency'],
        pattern: /\b(divisa|currency)\s*(=|:)?\s*eur\b/i,
        casosAfectados: 12,
        porcentaje: 18
    },
    FECHA_VALOR_HOY: {
        codigo: 'FECHA_VALOR_HOY',
        nombre: 'Fecha valor = Hoy',
        dominio: 'TEMPORAL',
        parametrizable: false,
        descripcion: 'Fecha de valor igual a la fecha actual',
        keywords: ['fecha', 'valor', 'hoy', 'actual', 'today', 'date'],
        pattern: /\b(fecha\s*valor|value\s*date)\s*(=|:)?\s*(hoy|today|actual)\b/i,
        casosAfectados: 8,
        porcentaje: 12
    },
    CANAL_OFICINA: {
        codigo: 'CANAL_OFICINA',
        nombre: 'Canal = Oficina',
        dominio: 'OPERATIVA',
        parametrizable: false,
        descripcion: 'Canal de operación es oficina/sucursal',
        keywords: ['canal', 'oficina', 'sucursal', 'branch', 'channel'],
        pattern: /\b(canal|channel)\s*(=|:)?\s*(oficina|branch|sucursal)\b/i,
        casosAfectados: 15,
        porcentaje: 22
    },
    OPERACION_COMPRA: {
        codigo: 'OPERACION_COMPRA',
        nombre: 'Operación = Compra',
        dominio: 'OPERATIVA',
        parametrizable: false,
        descripcion: 'Tipo de operación es compra',
        keywords: ['operación', 'compra', 'adquisición', 'buy', 'purchase'],
        pattern: /\b(operaci[oó]n|operation|tipo)\s*(=|:)?\s*(compra|buy|purchase)\b/i,
        casosAfectados: 25,
        porcentaje: 37
    },
    TIPO_ORDEN_LIMITADA: {
        codigo: 'TIPO_ORDEN_LIMITADA',
        nombre: 'Tipo Orden = Limitada',
        dominio: 'OPERATIVA',
        parametrizable: false,
        descripcion: 'Tipo de orden es limitada',
        keywords: ['tipo', 'orden', 'limitada', 'límite', 'limit', 'order'],
        pattern: /\b(tipo\s*orden|order\s*type)\s*(=|:)?\s*(limitada|limit)\b/i,
        casosAfectados: 18,
        porcentaje: 27
    },
    TEST_CF: {
        codigo: 'TEST_CF',
        nombre: 'Test de Capacidad Financiera',
        dominio: 'REGULATORIO',
        parametrizable: false,
        descripcion: 'Verifica que el cliente tiene capacidad económica suficiente',
        keywords: ['capacidad', 'financiera', 'cf', 'financial', 'capacity'],
        pattern: /\b(test\s*cf|capacidad\s*financiera|financial\s*capacity)\b/i,
        casosAfectados: 136,
        porcentaje: 96,
        categoria: 'COMPLIANCE',
        critico: true
    },
    TEST_TC: {
        codigo: 'TEST_TC',
        nombre: 'Test de Conveniencia',
        dominio: 'REGULATORIO',
        parametrizable: false,
        descripcion: 'Verifica que el producto es conveniente para el cliente',
        keywords: ['test', 'conveniencia', 'tc', 'convenience'],
        pattern: /\b(test\s*tc|test\s*de\s*conveniencia|conveniencia|convenience\s*test)\b/i,
        casosAfectados: 136,
        porcentaje: 96,
        categoria: 'COMPLIANCE',
        critico: true
    },
    SALDO_DV01: {
        codigo: 'SALDO_DV01',
        nombre: 'Saldo DV01 > 1.000€',
        dominio: 'RIESGO',
        parametrizable: true,
        descripcion: 'Verifica que el saldo DV01 sea superior a 1.000 euros',
        keywords: ['saldo', 'dv01', '1000', '1.000', 'mayor', 'superior'],
        pattern: /\b(saldo\s*dv01|dv01)\s*(>|>=|mayor|superior)\s*(1\.?000|1000)\s*€?\b/i,
        casosAfectados: 126,
        porcentaje: 89,
        categoria: 'LIMITE_RIESGO',
        critico: true,
        parametros: {
            umbral: 1000,
            moneda: 'EUR',
            operador: '>'
        }
    }
};

/**
 * Parsea archivo Markdown con casos Broker
 * Formato esperado: casos separados por "---"
 * 
 * @param {string} contenidoMD - Contenido del archivo Markdown
 * @returns {Array<Object>} Array de objetos caso
 */
function parseoCasosBroker(contenidoMD) {
    try {
        log('Iniciando parseo de casos Broker...', 'debug');
        
        if (!contenidoMD || contenidoMD.trim() === '') {
            log('Contenido MD vacío', 'warn');
            return [];
        }
        
        // Separar casos por "---"
        const casosBruto = contenidoMD.split(/\n---+\n/);
        const casos = [];
        
        casosBruto.forEach((casoTexto, index) => {
            if (!casoTexto.trim()) return;
            
            const caso = {
                id: null,
                numero: index + 1,
                descripcion: '',
                condicionesAplicadas: [],
                texto_completo: casoTexto.trim(),
                metadata: {}
            };
            
            // Extraer ID del caso (buscar patrones como "Caso XX" o "ID: XX")
            const matchID = casoTexto.match(/(?:caso|id)[:\s]+(\d+)/i);
            if (matchID) {
                caso.id = matchID[1];
            } else {
                caso.id = `CASO_${index + 1}`;
            }
            
            // Extraer descripción (primer párrafo o líneas después de título)
            const lineas = casoTexto.split('\n').filter(l => l.trim());
            const descripcionLineas = lineas.slice(0, 3).join(' ');
            caso.descripcion = truncarTexto(descripcionLineas, 200);
            
            // Buscar condiciones mencionadas en el texto
            // Buscar patrones de condiciones
            const textoBusqueda = normalizarTexto(casoTexto);
            
            for (const [codigo, condicion] of Object.entries(CONDICIONES_MODELADAS)) {
                let encontrada = false;
                
                // Buscar por pattern regex
                if (condicion.pattern && condicion.pattern.test(casoTexto)) {
                    encontrada = true;
                }
                
                // Buscar por keywords
                if (!encontrada) {
                    const keywordsEncontradas = condicion.keywords.filter(keyword => {
                        const keywordNorm = normalizarTexto(keyword);
                        return textoBusqueda.includes(keywordNorm);
                    });
                    
                    // Si encuentra al menos 2 keywords, considerar match
                    if (keywordsEncontradas.length >= 2) {
                        encontrada = true;
                    }
                }
                
                if (encontrada) {
                    caso.condicionesAplicadas.push({
                        codigo: codigo,
                        nombre: condicion.nombre,
                        dominio: condicion.dominio,
                        confianza: 85 // Alta confianza en pattern match
                    });
                }
            }
            
            casos.push(caso);
        });
        
        log(`Parseados ${casos.length} casos Broker`, 'info');
        return casos;
        
    } catch (error) {
        log(`Error en parseo de casos Broker: ${error.message}`, 'error');
        return [];
    }
}

/**
 * Parsea archivo TXT con condiciones ICARIA
 * Formato: una condición por línea o separadas por saltos de línea
 * 
 * @param {string} contenidoTXT - Contenido del archivo TXT
 * @returns {Array<Object>} Array de condiciones
 */
function parseoCondicionesIcaria(contenidoTXT) {
    try {
        log('Iniciando parseo de condiciones ICARIA...', 'debug');
        
        if (!contenidoTXT || contenidoTXT.trim() === '') {
            log('Contenido TXT vacío', 'warn');
            return [];
        }
        
        const lineas = contenidoTXT.split('\n');
        const condiciones = [];
        
        lineas.forEach((linea, index) => {
            const lineaLimpia = linea.trim();
            
            // Ignorar líneas vacías y comentarios
            if (!lineaLimpia || lineaLimpia.startsWith('#') || lineaLimpia.startsWith('//')) {
                return;
            }
            
            // Extraer información de la condición
            const condicion = {
                id: `COND_${index + 1}`,
                nombre: lineaLimpia,
                texto_original: linea,
                dominio: detectarDominio(lineaLimpia),
                keywords: extraerKeywords(lineaLimpia),
                modelada: verificarSiEstaModelada(lineaLimpia)
            };
            
            condiciones.push(condicion);
        });
        
        log(`Parseadas ${condiciones.length} condiciones ICARIA`, 'info');
        return condiciones;
        
    } catch (error) {
        log(`Error en parseo de condiciones ICARIA: ${error.message}`, 'error');
        return [];
    }
}

/**
 * Detecta el dominio de una condición basándose en keywords
 * @param {string} texto - Texto de la condición
 * @returns {string} Dominio detectado
 */
function detectarDominio(texto) {
    const textoNorm = normalizarTexto(texto);
    
    // Palabras clave por dominio
    const dominios = {
        OPERATIVA: ['operacion', 'compra', 'venta', 'orden', 'canal', 'divisa', 'tipo'],
        TEMPORAL: ['fecha', 'hora', 'dia', 'mes', 'año', 'plazo', 'vencimiento'],
        FINANCIERA: ['importe', 'saldo', 'precio', 'comision', 'coste', 'valor'],
        NORMATIVA: ['test', 'mifid', 'normativa', 'cumplimiento', 'regulacion'],
        PERFIL: ['perfil', 'usuario', 'cliente', 'edad', 'experiencia', 'conocimiento']
    };
    
    for (const [dominio, keywords] of Object.entries(dominios)) {
        for (const keyword of keywords) {
            if (textoNorm.includes(keyword)) {
                return CONFIG.DOMINIOS[dominio] || dominio;
            }
        }
    }
    
    return 'Sin clasificar';
}

/**
 * Extrae keywords relevantes de un texto
 * @param {string} texto - Texto de la condición
 * @returns {Array<string>} Array de keywords
 */
function extraerKeywords(texto) {
    const textoNorm = normalizarTexto(texto);
    
    // Eliminar palabras comunes (stop words)
    const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'ser', 'se', 'no', 'por', 'con', 'para'];
    
    const palabras = textoNorm.split(' ').filter(p => 
        p.length > 2 && !stopWords.includes(p)
    );
    
    // Retornar palabras únicas
    return [...new Set(palabras)];
}

/**
 * Verifica si una condición ya está modelada
 * @param {string} texto - Texto de la condición
 * @returns {boolean} True si está modelada
 */
function verificarSiEstaModelada(texto) {
    const textoNorm = normalizarTexto(texto);
    
    for (const condicion of Object.values(CONDICIONES_MODELADAS)) {
        // Verificar por pattern
        if (condicion.pattern && condicion.pattern.test(texto)) {
            return true;
        }
        
        // Verificar por similitud de nombre
        const similitud = similitudCadenas(textoNorm, normalizarTexto(condicion.nombre));
        if (similitud > 80) {
            return true;
        }
    }
    
    return false;
}

/**
 * Algoritmo de matching inteligente entre casos y condiciones
 * @param {Object} caso - Caso a analizar
 * @param {Array<Object>} condicionesICARIA - Condiciones ICARIA disponibles
 * @returns {Object} Resultado del matching con scoring
 */
function matchingInteligente(caso, condicionesICARIA) {
    try {
        log(`Analizando caso ${caso.id}...`, 'debug');
        
        const resultado = {
            casoId: caso.id,
            casoDescripcion: caso.descripcion,
            condicionesEncontradas: [],
            condicionesNoEncontradas: [],
            scoring: 0,
            estado: 'No Modelada',
            detalles: {}
        };
        
        // Si no hay condiciones ICARIA, usar las modeladas por defecto
        const condiciones = condicionesICARIA && condicionesICARIA.length > 0 
            ? condicionesICARIA 
            : Object.values(CONDICIONES_MODELADAS);
        
        const textoNormCaso = normalizarTexto(caso.texto_completo);
        
        // Analizar cada condición ICARIA
        condiciones.forEach(condicion => {
            const match = {
                condicion: condicion.nombre || condicion.codigo,
                codigo: condicion.codigo || condicion.id,
                dominio: condicion.dominio,
                tipoMatch: null,
                confianza: 0,
                razon: ''
            };
            
            // 1. Búsqueda por pattern regex (si existe)
            if (condicion.pattern) {
                if (condicion.pattern.test(caso.texto_completo)) {
                    match.tipoMatch = 'pattern';
                    match.confianza = 95;
                    match.razon = 'Coincidencia exacta por patrón';
                    resultado.condicionesEncontradas.push(match);
                    return;
                }
            }
            
            // 2. Búsqueda por keywords
            if (condicion.keywords && condicion.keywords.length > 0) {
                const keywordsEncontradas = condicion.keywords.filter(keyword => {
                    const keywordNorm = normalizarTexto(keyword);
                    return textoNormCaso.includes(keywordNorm);
                });
                
                const porcentajeKeywords = (keywordsEncontradas.length / condicion.keywords.length) * 100;
                
                if (porcentajeKeywords >= 50) {
                    match.tipoMatch = 'keywords';
                    match.confianza = Math.round(porcentajeKeywords);
                    match.razon = `${keywordsEncontradas.length}/${condicion.keywords.length} keywords encontradas`;
                    resultado.condicionesEncontradas.push(match);
                    return;
                }
            }
            
            // 3. Fuzzy matching por similitud de texto
            const similitud = similitudCadenas(
                textoNormCaso,
                normalizarTexto(condicion.nombre || condicion.texto_original || '')
            );
            
            if (similitud >= 60) {
                match.tipoMatch = 'fuzzy';
                match.confianza = similitud;
                match.razon = `Similitud textual del ${similitud}%`;
                resultado.condicionesEncontradas.push(match);
                return;
            }
            
            // No encontrada
            resultado.condicionesNoEncontradas.push({
                condicion: condicion.nombre || condicion.codigo,
                codigo: condicion.codigo || condicion.id
            });
        });
        
        // Calcular scoring final
        resultado.scoring = calculoScoring(
            resultado.condicionesEncontradas,
            condiciones.length
        );
        
        // Determinar estado según thresholds
        if (resultado.scoring >= CONFIG.THRESHOLD_MODELADA) {
            resultado.estado = 'Modelada';
        } else if (resultado.scoring >= CONFIG.THRESHOLD_PARCIAL) {
            resultado.estado = 'Parcial';
        } else {
            resultado.estado = 'No Modelada';
        }
        
        // Detalles adicionales
        resultado.detalles = {
            totalCondiciones: condiciones.length,
            encontradas: resultado.condicionesEncontradas.length,
            noEncontradas: resultado.condicionesNoEncontradas.length,
            confianzaPromedio: resultado.condicionesEncontradas.length > 0
                ? Math.round(
                    resultado.condicionesEncontradas.reduce((sum, c) => sum + c.confianza, 0) / 
                    resultado.condicionesEncontradas.length
                  )
                : 0
        };
        
        log(`Caso ${caso.id}: ${resultado.estado} (${resultado.scoring}%)`, 'debug');
        
        return resultado;
        
    } catch (error) {
        log(`Error en matching inteligente: ${error.message}`, 'error');
        return {
            casoId: caso.id,
            error: error.message,
            scoring: 0,
            estado: 'Error'
        };
    }
}

/**
 * Calcula el scoring de cobertura
 * @param {Array<Object>} coincidencias - Coincidencias encontradas
 * @param {number} totalCondiciones - Total de condiciones a evaluar
 * @returns {number} Scoring 0-100
 */
function calculoScoring(coincidencias, totalCondiciones) {
    if (totalCondiciones === 0) return 0;
    if (!coincidencias || coincidencias.length === 0) return 0;
    
    // Scoring base: porcentaje de condiciones encontradas
    const scoringBase = (coincidencias.length / totalCondiciones) * 100;
    
    // Aplicar pesos según tipo de match y confianza
    let scoringPonderado = 0;
    let pesoTotal = 0;
    
    coincidencias.forEach(match => {
        // Peso según tipo de match
        let peso = 1.0;
        switch (match.tipoMatch) {
            case 'pattern':
                peso = 1.2; // Mayor peso a matches exactos
                break;
            case 'keywords':
                peso = 1.0;
                break;
            case 'fuzzy':
                peso = 0.8; // Menor peso a matches por similitud
                break;
        }
        
        // Ajustar por confianza
        const confianzaNormalizada = match.confianza / 100;
        const puntosPonderados = peso * confianzaNormalizada * 100;
        
        scoringPonderado += puntosPonderados;
        pesoTotal += peso;
    });
    
    // Normalizar al número de condiciones totales
    if (pesoTotal > 0) {
        scoringPonderado = (scoringPonderado / pesoTotal / totalCondiciones) * 100;
    }
    
    // Promedio entre scoring base y ponderado (más conservador)
    const scoringFinal = (scoringBase + scoringPonderado) / 2;
    
    return Math.min(100, Math.max(0, Math.round(scoringFinal)));
}

/**
 * Analiza múltiples casos y genera reporte completo
 * @param {Array<Object>} casos - Array de casos a analizar
 * @param {Array<Object>} condicionesICARIA - Condiciones ICARIA
 * @returns {Object} Reporte completo del análisis
 */
function analizarCasos(casos, condicionesICARIA) {
    try {
        log(`Iniciando análisis de ${casos.length} casos...`, 'info');
        
        const resultados = [];
        const estadisticas = {
            totalCasos: casos.length,
            casosModelados: 0,
            casosParciales: 0,
            casosNoModelados: 0,
            casosConError: 0,
            scoringPromedio: 0,
            condicionesMasFrecuentes: {},
            distribucionPorDominio: {}
        };
        
        // Analizar cada caso
        casos.forEach(caso => {
            const resultado = matchingInteligente(caso, condicionesICARIA);
            resultados.push(resultado);
            
            // Actualizar estadísticas
            switch (resultado.estado) {
                case 'Modelada':
                    estadisticas.casosModelados++;
                    break;
                case 'Parcial':
                    estadisticas.casosParciales++;
                    break;
                case 'No Modelada':
                    estadisticas.casosNoModelados++;
                    break;
                case 'Error':
                    estadisticas.casosConError++;
                    break;
            }
            
            // Contabilizar condiciones encontradas
            resultado.condicionesEncontradas.forEach(match => {
                const codigo = match.codigo;
                estadisticas.condicionesMasFrecuentes[codigo] = 
                    (estadisticas.condicionesMasFrecuentes[codigo] || 0) + 1;
                
                // Contabilizar por dominio
                const dominio = match.dominio || 'Sin clasificar';
                estadisticas.distribucionPorDominio[dominio] = 
                    (estadisticas.distribucionPorDominio[dominio] || 0) + 1;
            });
        });
        
        // Calcular scoring promedio
        const scoringTotal = resultados.reduce((sum, r) => sum + (r.scoring || 0), 0);
        estadisticas.scoringPromedio = casos.length > 0 
            ? Math.round(scoringTotal / casos.length) 
            : 0;
        
        // Calcular porcentajes
        estadisticas.porcentajeModelada = calcularPorcentaje(estadisticas.casosModelados, estadisticas.totalCasos);
        estadisticas.porcentajeParcial = calcularPorcentaje(estadisticas.casosParciales, estadisticas.totalCasos);
        estadisticas.porcentajeNoModelada = calcularPorcentaje(estadisticas.casosNoModelados, estadisticas.totalCasos);
        
        // Ordenar condiciones más frecuentes
        const condicionesFrecuentes = Object.entries(estadisticas.condicionesMasFrecuentes)
            .map(([codigo, frecuencia]) => ({
                codigo,
                nombre: obtenerNombreCondicion(codigo),
                frecuencia,
                porcentaje: calcularPorcentaje(frecuencia, casos.length)
            }))
            .sort((a, b) => b.frecuencia - a.frecuencia)
            .slice(0, 10); // Top 10
        
        log(`Análisis completado: ${estadisticas.scoringPromedio}% cobertura promedio`, 'info');
        
        return {
            resultados,
            estadisticas,
            condicionesFrecuentes,
            timestamp: new Date(),
            version: CONFIG.VERSION
        };
        
    } catch (error) {
        log(`Error en análisis de casos: ${error.message}`, 'error');
        return {
            error: error.message,
            resultados: [],
            estadisticas: {}
        };
    }
}

/**
 * Obtiene el nombre de una condición por su código
 * @param {string} codigo - Código de la condición
 * @returns {string} Nombre de la condición
 */
function obtenerNombreCondicion(codigo) {
    if (CONDICIONES_MODELADAS[codigo]) {
        return CONDICIONES_MODELADAS[codigo].nombre;
    }
    return codigo;
}

/**
 * Genera reporte detallado del análisis
 * @param {Object} analisis - Resultado del análisis
 * @returns {Object} Reporte formateado
 */
function generacionReporte(analisis) {
    try {
        const { estadisticas, condicionesFrecuentes, resultados } = analisis;
        
        const reporte = {
            // Resumen ejecutivo
            resumenEjecutivo: {
                totalCasos: estadisticas.totalCasos || 0,
                coberturaPromedio: estadisticas.scoringPromedio || 0,
                casosModelados: estadisticas.casosModelados || 0,
                casosParciales: estadisticas.casosParciales || 0,
                casosNoModelados: estadisticas.casosNoModelados || 0,
                porcentajeModelada: estadisticas.porcentajeModelada || 0,
                porcentajeParcial: estadisticas.porcentajeParcial || 0,
                porcentajeNoModelada: estadisticas.porcentajeNoModelada || 0
            },
            
            // Distribución de estados
            distribucion: {
                labels: ['Modelada', 'Parcial', 'No Modelada'],
                values: [
                    estadisticas.casosModelados || 0,
                    estadisticas.casosParciales || 0,
                    estadisticas.casosNoModelados || 0
                ],
                colors: [
                    CONFIG.COLORES.MODELADA,
                    CONFIG.COLORES.PARCIAL,
                    CONFIG.COLORES.NO_MODELADA
                ]
            },
            
            // Condiciones más frecuentes
            condicionesFrecuentes: condicionesFrecuentes || [],
            
            // Gaps detectados (condiciones no modeladas más frecuentes)
            gaps: identificarGaps(resultados),
            
            // Detalles por caso
            casosPorEstado: {
                modelados: resultados.filter(r => r.estado === 'Modelada'),
                parciales: resultados.filter(r => r.estado === 'Parcial'),
                noModelados: resultados.filter(r => r.estado === 'No Modelada')
            },
            
            // Metadata
            metadata: {
                fechaGeneracion: formatearFecha(new Date()),
                version: CONFIG.VERSION,
                totalCondicionesModeladas: Object.keys(CONDICIONES_MODELADAS).length
            }
        };
        
        log('Reporte generado exitosamente', 'info');
        return reporte;
        
    } catch (error) {
        log(`Error en generación de reporte: ${error.message}`, 'error');
        return { error: error.message };
    }
}

/**
 * Identifica gaps (condiciones no encontradas con alta frecuencia)
 * @param {Array<Object>} resultados - Resultados del análisis
 * @returns {Array<Object>} Lista de gaps
 */
function identificarGaps(resultados) {
    const gapsMap = {};
    
    resultados.forEach(resultado => {
        if (resultado.condicionesNoEncontradas) {
            resultado.condicionesNoEncontradas.forEach(cond => {
                const key = cond.codigo || cond.condicion;
                if (!gapsMap[key]) {
                    gapsMap[key] = {
                        codigo: key,
                        nombre: cond.condicion,
                        impacto: 0
                    };
                }
                gapsMap[key].impacto++;
            });
        }
    });
    
    // Convertir a array y ordenar por impacto
    const gaps = Object.values(gapsMap)
        .sort((a, b) => b.impacto - a.impacto)
        .slice(0, 10); // Top 10 gaps
    
    return gaps;
}

/**
 * Busca condiciones en catálogo por texto libre
 * @param {string} textoUsuario - Texto ingresado por el usuario
 * @param {Array<Object>} catalogoCondiciones - Catálogo de condiciones
 * @returns {Array<Object>} Condiciones encontradas con scoring
 */
function buscarEnCatalogo(textoUsuario, catalogoCondiciones = null) {
    try {
        const catalogo = catalogoCondiciones || Object.values(CONDICIONES_MODELADAS);
        const textoNorm = normalizarTexto(textoUsuario);
        const resultados = [];
        
        catalogo.forEach(condicion => {
            const similitud = similitudCadenas(
                textoNorm,
                normalizarTexto(condicion.nombre || condicion.descripcion || '')
            );
            
            if (similitud >= 30) { // Umbral mínimo de similitud
                resultados.push({
                    condicion: condicion,
                    similitud: similitud,
                    estado: condicion.codigo ? 'Modelada' : 'No Modelada'
                });
            }
        });
        
        // Ordenar por similitud descendente
        resultados.sort((a, b) => b.similitud - a.similitud);
        
        return resultados.slice(0, 10); // Top 10 resultados
        
    } catch (error) {
        log(`Error en búsqueda de catálogo: ${error.message}`, 'error');
        return [];
    }
}

// Exportar funciones y constantes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONDICIONES_MODELADAS,
        parseoCasosBroker,
        parseoCondicionesIcaria,
        matchingInteligente,
        calculoScoring,
        analizarCasos,
        generacionReporte,
        buscarEnCatalogo,
        detectarDominio,
        extraerKeywords,
        verificarSiEstaModelada
    };
}
