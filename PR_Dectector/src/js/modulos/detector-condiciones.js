/**
 * ICARIA Intelligence Platform - Módulo 1: Detector de Condiciones
 * 
 * Módulo principal para la detección y análisis de condiciones en casos Broker
 * 
 * @version 2.0.0
 * @author Antonio Rodriguez Smith - DXC Technology
 * @client Banco Sabadell S.A. - TDM Department
 * @confidential
 */

// Estado del módulo
const DetectorCondiciones = {
    casosCargados: [],
    condicionesCargadas: [],
    ultimoAnalisis: null,
    tabla: null,
    grafico: null
};

/**
 * Inicializa el módulo de detector de condiciones
 */
function inicializarDetectorCondiciones() {
    try {
        log('Inicializando Módulo 1: Detector de Condiciones', 'info');
        
        // Configurar event listeners
        configurarEventListeners();
        
        // Inicializar tooltips y popovers
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
        }
        
        // Mostrar estado inicial
        actualizarEstadoInicial();
        
        log('Módulo Detector de Condiciones inicializado', 'info');
        
    } catch (error) {
        log(`Error al inicializar Detector de Condiciones: ${error.message}`, 'error');
    }
}

/**
 * Configura los event listeners del módulo
 */
function configurarEventListeners() {
    // Input de archivo de casos
    const inputCasos = document.getElementById('input-casos-broker');
    if (inputCasos) {
        inputCasos.addEventListener('change', manejarCargaCasos);
    }
    
    // Input de archivo de condiciones
    const inputCondiciones = document.getElementById('input-condiciones-icaria');
    if (inputCondiciones) {
        inputCondiciones.addEventListener('change', manejarCargaCondiciones);
    }
    
    // Botón de análisis
    const btnAnalizar = document.getElementById('btn-analizar');
    if (btnAnalizar) {
        btnAnalizar.addEventListener('click', ejecutarAnalisis);
    }
    
    // Botones de exportación
    const btnExportMD = document.getElementById('btn-export-md');
    if (btnExportMD) {
        btnExportMD.addEventListener('click', () => exportarResultados('markdown'));
    }
    
    const btnExportPDF = document.getElementById('btn-export-pdf');
    if (btnExportPDF) {
        btnExportPDF.addEventListener('click', () => exportarResultados('pdf'));
    }
    
    // Botón limpiar
    const btnLimpiar = document.getElementById('btn-limpiar');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarAnalisis);
    }
}

/**
 * Maneja la carga del archivo de casos Broker
 * @param {Event} evento - Evento de cambio del input file
 */
function manejarCargaCasos(evento) {
    const archivo = evento.target.files[0];
    
    if (!archivo) return;
    
    // Validar archivo
    const validacion = validarArchivo(archivo);
    if (!validacion.valido) {
        mostrarNotificacion(validacion.error, 'error');
        return;
    }
    
    mostrarNotificacion(CONFIG.MENSAJES.PROCESANDO, 'info');
    
    // Leer archivo
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const contenido = e.target.result;
            DetectorCondiciones.casosCargados = parseoCasosBroker(contenido);
            
            if (DetectorCondiciones.casosCargados.length === 0) {
                mostrarNotificacion('No se encontraron casos válidos en el archivo', 'warning');
                return;
            }
            
            mostrarNotificacion(
                `${DetectorCondiciones.casosCargados.length} casos cargados correctamente`, 
                'success'
            );
            
            actualizarEstadoCarga();
            
        } catch (error) {
            log(`Error al procesar archivo de casos: ${error.message}`, 'error');
            mostrarNotificacion(CONFIG.MENSAJES.ERROR_CARGA, 'error');
        }
    };
    
    reader.onerror = function() {
        mostrarNotificacion(CONFIG.MENSAJES.ERROR_CARGA, 'error');
    };
    
    reader.readAsText(archivo);
}

/**
 * Maneja la carga del archivo de condiciones ICARIA
 * @param {Event} evento - Evento de cambio del input file
 */
function manejarCargaCondiciones(evento) {
    const archivo = evento.target.files[0];
    
    if (!archivo) return;
    
    // Validar archivo
    const validacion = validarArchivo(archivo);
    if (!validacion.valido) {
        mostrarNotificacion(validacion.error, 'error');
        return;
    }
    
    mostrarNotificacion(CONFIG.MENSAJES.PROCESANDO, 'info');
    
    // Leer archivo
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const contenido = e.target.result;
            DetectorCondiciones.condicionesCargadas = parseoCondicionesIcaria(contenido);
            
            if (DetectorCondiciones.condicionesCargadas.length === 0) {
                mostrarNotificacion('No se encontraron condiciones válidas en el archivo', 'warning');
                return;
            }
            
            mostrarNotificacion(
                `${DetectorCondiciones.condicionesCargadas.length} condiciones cargadas correctamente`, 
                'success'
            );
            
            actualizarEstadoCarga();
            
        } catch (error) {
            log(`Error al procesar archivo de condiciones: ${error.message}`, 'error');
            mostrarNotificacion(CONFIG.MENSAJES.ERROR_CARGA, 'error');
        }
    };
    
    reader.onerror = function() {
        mostrarNotificacion(CONFIG.MENSAJES.ERROR_CARGA, 'error');
    };
    
    reader.readAsText(archivo);
}

/**
 * Ejecuta el análisis de matching
 */
function ejecutarAnalisis() {
    try {
        // Validar que hay datos cargados
        if (DetectorCondiciones.casosCargados.length === 0) {
            mostrarNotificacion('Debe cargar un archivo de casos Broker', 'warning');
            return;
        }
        
        log('Ejecutando análisis...', 'info');
        mostrarNotificacion(CONFIG.MENSAJES.PROCESANDO, 'info');
        
        // Mostrar spinner
        mostrarSpinner(true);
        
        // Ejecutar análisis (con pequeño delay para permitir que se muestre el spinner)
        setTimeout(() => {
            try {
                // Analizar casos
                const analisis = analizarCasos(
                    DetectorCondiciones.casosCargados,
                    DetectorCondiciones.condicionesCargadas.length > 0 
                        ? DetectorCondiciones.condicionesCargadas 
                        : null
                );
                
                // Guardar resultado
                DetectorCondiciones.ultimoAnalisis = analisis;
                
                // Generar reporte
                const reporte = generacionReporte(analisis);
                
                // Mostrar resultados
                mostrarResultados(reporte, analisis);
                
                // Guardar en localStorage
                localStorage.setItem(
                    CONFIG.STORAGE_KEYS.ULTIMO_ANALISIS, 
                    JSON.stringify({
                        fecha: new Date(),
                        reporte: reporte
                    })
                );
                
                mostrarNotificacion(CONFIG.MENSAJES.COMPLETADO, 'success');
                log(`Análisis completado: ${reporte.resumenEjecutivo.coberturaPromedio}% cobertura`, 'info');
                
            } catch (error) {
                log(`Error durante el análisis: ${error.message}`, 'error');
                mostrarNotificacion('Error durante el análisis', 'error');
            } finally {
                mostrarSpinner(false);
            }
        }, 100);
        
    } catch (error) {
        log(`Error al ejecutar análisis: ${error.message}`, 'error');
        mostrarNotificacion('Error al ejecutar análisis', 'error');
        mostrarSpinner(false);
    }
}

/**
 * Muestra los resultados del análisis
 * @param {Object} reporte - Reporte generado
 * @param {Object} analisis - Análisis completo
 */
function mostrarResultados(reporte, analisis) {
    // Actualizar métricas en dashboard
    actualizarMetricasDashboard(reporte.resumenEjecutivo);
    
    // Renderizar tabla de resultados
    renderizarTablaResultados(analisis.resultados);
    
    // Renderizar gráficos
    renderizarGraficos(reporte);
    
    // Mostrar sección de resultados
    const seccionResultados = document.getElementById('seccion-resultados');
    if (seccionResultados) {
        seccionResultados.style.display = 'block';
        seccionResultados.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Actualiza las métricas del dashboard
 * @param {Object} metricas - Métricas a mostrar
 */
function actualizarMetricasDashboard(metricas) {
    // Total casos
    const elemTotalCasos = document.getElementById('metrica-total-casos');
    if (elemTotalCasos) {
        elemTotalCasos.textContent = formatearNumero(metricas.totalCasos);
    }
    
    // Cobertura promedio
    const elemCobertura = document.getElementById('metrica-cobertura');
    if (elemCobertura) {
        elemCobertura.textContent = `${metricas.coberturaPromedio}%`;
        
        // Aplicar color según threshold
        elemCobertura.classList.remove('text-success', 'text-warning', 'text-danger');
        if (metricas.coberturaPromedio >= CONFIG.THRESHOLD_MODELADA) {
            elemCobertura.classList.add('text-success');
        } else if (metricas.coberturaPromedio >= CONFIG.THRESHOLD_PARCIAL) {
            elemCobertura.classList.add('text-warning');
        } else {
            elemCobertura.classList.add('text-danger');
        }
    }
    
    // Casos modelados
    const elemModelados = document.getElementById('metrica-modelados');
    if (elemModelados) {
        elemModelados.textContent = `${metricas.casosModelados} (${metricas.porcentajeModelada}%)`;
    }
    
    // Casos parciales
    const elemParciales = document.getElementById('metrica-parciales');
    if (elemParciales) {
        elemParciales.textContent = `${metricas.casosParciales} (${metricas.porcentajeParcial}%)`;
    }
    
    // Casos no modelados
    const elemNoModelados = document.getElementById('metrica-no-modelados');
    if (elemNoModelados) {
        elemNoModelados.textContent = `${metricas.casosNoModelados} (${metricas.porcentajeNoModelada}%)`;
    }
}

/**
 * Renderiza la tabla de resultados con DataTables
 * @param {Array<Object>} resultados - Resultados del análisis
 */
function renderizarTablaResultados(resultados) {
    const tabla = document.getElementById('tabla-resultados');
    if (!tabla) return;
    
    const tbody = tabla.querySelector('tbody');
    if (!tbody) return;
    
    // Limpiar tabla
    tbody.innerHTML = '';
    
    // Destruir DataTable existente
    if (DetectorCondiciones.tabla) {
        DetectorCondiciones.tabla.destroy();
    }
    
    // Llenar tabla
    resultados.forEach(resultado => {
        const tr = document.createElement('tr');
        
        // Clase según estado
        let claseEstado = '';
        let badgeClass = 'secondary';
        switch (resultado.estado) {
            case 'Modelada':
                claseEstado = 'table-success';
                badgeClass = 'success';
                break;
            case 'Parcial':
                claseEstado = 'table-warning';
                badgeClass = 'warning';
                break;
            case 'No Modelada':
                claseEstado = 'table-danger';
                badgeClass = 'danger';
                break;
        }
        
        tr.className = claseEstado;
        tr.innerHTML = `
            <td>${resultado.casoId}</td>
            <td>${truncarTexto(resultado.casoDescripcion, 100)}</td>
            <td class="text-center">
                <span class="badge bg-${badgeClass}">${resultado.estado}</span>
            </td>
            <td class="text-center">
                <strong>${resultado.scoring}%</strong>
            </td>
            <td class="text-center">
                ${resultado.detalles ? resultado.detalles.encontradas : 0} / 
                ${resultado.detalles ? resultado.detalles.totalCondiciones : 0}
            </td>
            <td class="text-center">
                ${resultado.detalles ? resultado.detalles.confianzaPromedio : 0}%
            </td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Inicializar DataTable
    if (typeof $.fn.DataTable !== 'undefined') {
        DetectorCondiciones.tabla = $(tabla).DataTable({
            ...CONFIG.DATATABLES_CONFIG,
            order: [[3, 'desc']], // Ordenar por scoring descendente
            columnDefs: [
                { targets: [2, 3, 4, 5], className: 'text-center' }
            ]
        });
    }
}

/**
 * Renderiza los gráficos con Chart.js
 * @param {Object} reporte - Reporte del análisis
 */
function renderizarGraficos(reporte) {
    renderizarGraficoDistribucion(reporte.distribucion);
    renderizarGraficoCondiciones(reporte.condicionesFrecuentes);
}

/**
 * Renderiza gráfico de distribución de estados
 * @param {Object} distribucion - Datos de distribución
 */
function renderizarGraficoDistribucion(distribucion) {
    const canvas = document.getElementById('grafico-distribucion');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Destruir gráfico existente
    if (DetectorCondiciones.grafico) {
        DetectorCondiciones.grafico.destroy();
    }
    
    DetectorCondiciones.grafico = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: distribucion.labels,
            datasets: [{
                data: distribucion.values,
                backgroundColor: distribucion.colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            ...CONFIG.CHART_CONFIG,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Distribución de Estados'
                }
            }
        }
    });
}

/**
 * Renderiza gráfico de condiciones más frecuentes
 * @param {Array<Object>} condiciones - Condiciones frecuentes
 */
function renderizarGraficoCondiciones(condiciones) {
    const canvas = document.getElementById('grafico-condiciones');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Tomar top 5
    const top5 = condiciones.slice(0, 5);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: top5.map(c => truncarTexto(c.nombre, 30)),
            datasets: [{
                label: 'Frecuencia',
                data: top5.map(c => c.frecuencia),
                backgroundColor: CONFIG.COLORES.PRINCIPAL,
                borderColor: CONFIG.COLORES.SECUNDARIO,
                borderWidth: 1
            }]
        },
        options: {
            ...CONFIG.CHART_CONFIG,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Top 5 Condiciones Más Frecuentes'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

/**
 * Exporta los resultados en el formato especificado
 * @param {string} formato - 'markdown' o 'pdf'
 */
function exportarResultados(formato) {
    if (!DetectorCondiciones.ultimoAnalisis) {
        mostrarNotificacion('No hay resultados para exportar', 'warning');
        return;
    }
    
    try {
        const reporte = generacionReporte(DetectorCondiciones.ultimoAnalisis);
        
        if (formato === 'markdown') {
            const contenidoMD = exportarMarkdown(reporte.resumenEjecutivo);
            const nombreArchivo = `ICARIA_Analisis_${Date.now()}.md`;
            descargarArchivo(contenidoMD, nombreArchivo, 'text/markdown');
            mostrarNotificacion('Reporte Markdown descargado', 'success');
            
        } else if (formato === 'pdf') {
            const exito = exportarPDF(reporte.resumenEjecutivo);
            if (exito) {
                mostrarNotificacion('Reporte PDF descargado', 'success');
            } else {
                mostrarNotificacion('Error al generar PDF', 'error');
            }
        }
        
    } catch (error) {
        log(`Error al exportar resultados: ${error.message}`, 'error');
        mostrarNotificacion('Error al exportar resultados', 'error');
    }
}

/**
 * Limpia el análisis y reinicia el módulo
 */
function limpiarAnalisis() {
    if (!confirm('¿Está seguro de que desea limpiar todos los datos?')) {
        return;
    }
    
    DetectorCondiciones.casosCargados = [];
    DetectorCondiciones.condicionesCargadas = [];
    DetectorCondiciones.ultimoAnalisis = null;
    
    // Limpiar inputs
    const inputCasos = document.getElementById('input-casos-broker');
    if (inputCasos) inputCasos.value = '';
    
    const inputCondiciones = document.getElementById('input-condiciones-icaria');
    if (inputCondiciones) inputCondiciones.value = '';
    
    // Ocultar resultados
    const seccionResultados = document.getElementById('seccion-resultados');
    if (seccionResultados) {
        seccionResultados.style.display = 'none';
    }
    
    // Destruir tabla
    if (DetectorCondiciones.tabla) {
        DetectorCondiciones.tabla.destroy();
        DetectorCondiciones.tabla = null;
    }
    
    // Destruir gráfico
    if (DetectorCondiciones.grafico) {
        DetectorCondiciones.grafico.destroy();
        DetectorCondiciones.grafico = null;
    }
    
    actualizarEstadoInicial();
    mostrarNotificacion('Datos limpiados correctamente', 'info');
}

/**
 * Actualiza el estado inicial del módulo
 */
function actualizarEstadoInicial() {
    const elemEstado = document.getElementById('estado-carga');
    if (elemEstado) {
        elemEstado.innerHTML = `
            <div class="alert alert-info">
                <i class="bi bi-info-circle"></i>
                Cargue los archivos para comenzar el análisis
            </div>
        `;
    }
}

/**
 * Actualiza el estado de carga de archivos
 */
function actualizarEstadoCarga() {
    const elemEstado = document.getElementById('estado-carga');
    if (!elemEstado) return;
    
    const htmlEstado = `
        <div class="alert alert-success">
            <i class="bi bi-check-circle"></i>
            <strong>Archivos cargados:</strong><br>
            • Casos Broker: ${DetectorCondiciones.casosCargados.length} casos<br>
            ${DetectorCondiciones.condicionesCargadas.length > 0 
                ? `• Condiciones ICARIA: ${DetectorCondiciones.condicionesCargadas.length} condiciones` 
                : '• Condiciones ICARIA: Usando catálogo predefinido (5 condiciones)'}
        </div>
    `;
    
    elemEstado.innerHTML = htmlEstado;
    
    // Habilitar botón de análisis
    const btnAnalizar = document.getElementById('btn-analizar');
    if (btnAnalizar) {
        btnAnalizar.disabled = DetectorCondiciones.casosCargados.length === 0;
    }
}

/**
 * Muestra u oculta el spinner de carga
 * @param {boolean} mostrar - True para mostrar, false para ocultar
 */
function mostrarSpinner(mostrar) {
    const spinner = document.getElementById('spinner-analisis');
    if (spinner) {
        spinner.style.display = mostrar ? 'block' : 'none';
    }
}

// Inicializar módulo cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarDetectorCondiciones);
} else {
    inicializarDetectorCondiciones();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        inicializarDetectorCondiciones,
        ejecutarAnalisis,
        limpiarAnalisis,
        DetectorCondiciones
    };
}
