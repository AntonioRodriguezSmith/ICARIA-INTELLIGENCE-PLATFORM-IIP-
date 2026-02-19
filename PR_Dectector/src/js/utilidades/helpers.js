/**
 * ICARIA Intelligence Platform - Funciones Auxiliares
 * 
 * @version 2.0.0
 * @author Antonio Rodriguez Smith - DXC Technology
 * @client Banco Sabadell S.A. - TDM Department
 * @confidential
 */

/**
 * Formatea una fecha al formato español
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha formateada (dd/mm/yyyy HH:MM)
 */
function formatearFecha(fecha) {
    if (!fecha) return '';
    
    const d = fecha instanceof Date ? fecha : new Date(fecha);
    
    if (isNaN(d.getTime())) return '';
    
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const año = d.getFullYear();
    const horas = String(d.getHours()).padStart(2, '0');
    const minutos = String(d.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}

/**
 * Valida un archivo según extensión y tamaño
 * @param {File} archivo - Archivo a validar
 * @returns {Object} { valido: boolean, error: string }
 */
function validarArchivo(archivo) {
    if (!archivo) {
        return { valido: false, error: 'No se ha seleccionado ningún archivo' };
    }
    
    // Validar extensión
    const extension = '.' + archivo.name.split('.').pop().toLowerCase();
    if (!CONFIG.FORMATOS_PERMITIDOS.includes(extension)) {
        return { valido: false, error: CONFIG.MENSAJES.ERROR_FORMATO };
    }
    
    // Validar tamaño
    if (archivo.size > CONFIG.MAX_FILE_SIZE) {
        return { valido: false, error: CONFIG.MENSAJES.ERROR_TAMAÑO };
    }
    
    return { valido: true, error: null };
}

/**
 * Exporta datos a formato Markdown
 * @param {Object} datos - Datos del análisis
 * @returns {string} Contenido en formato Markdown
 */
function exportarMarkdown(datos) {
    let contenido = CONFIG.EXPORT_CONFIG.MARKDOWN.header;
    contenido += `**Fecha:** ${formatearFecha(new Date())}\n\n`;
    
    // Resumen ejecutivo
    contenido += '## Resumen Ejecutivo\n\n';
    contenido += `- **Total Casos:** ${datos.totalCasos || 0}\n`;
    contenido += `- **Cobertura Promedio:** ${datos.coberturaPromedio || 0}%\n`;
    contenido += `- **Casos Modelados:** ${datos.casosModelados || 0}\n`;
    contenido += `- **Casos Parciales:** ${datos.casosParciales || 0}\n`;
    contenido += `- **Casos No Modelados:** ${datos.casosNoModelados || 0}\n\n`;
    
    // Distribución
    contenido += '## Distribución de Estados\n\n';
    contenido += '| Estado | Cantidad | Porcentaje |\n';
    contenido += '|--------|----------|------------|\n';
    contenido += `| Modelada | ${datos.casosModelados || 0} | ${datos.porcentajeModelada || 0}% |\n`;
    contenido += `| Parcial | ${datos.casosParciales || 0} | ${datos.porcentajeParcial || 0}% |\n`;
    contenido += `| No Modelada | ${datos.casosNoModelados || 0} | ${datos.porcentajeNoModelada || 0}% |\n\n`;
    
    // Condiciones más frecuentes
    if (datos.condicionesFrecuentes && datos.condicionesFrecuentes.length > 0) {
        contenido += '## Condiciones Más Frecuentes\n\n';
        datos.condicionesFrecuentes.forEach((cond, idx) => {
            contenido += `${idx + 1}. **${cond.nombre}** - ${cond.frecuencia} casos (${cond.porcentaje}%)\n`;
        });
        contenido += '\n';
    }
    
    // Gaps detectados
    if (datos.gaps && datos.gaps.length > 0) {
        contenido += '## Gaps Detectados\n\n';
        datos.gaps.forEach((gap, idx) => {
            contenido += `${idx + 1}. **${gap.nombre}** - ${gap.impacto} casos afectados\n`;
        });
        contenido += '\n';
    }
    
    contenido += CONFIG.EXPORT_CONFIG.MARKDOWN.footer;
    
    return contenido;
}

/**
 * Exporta datos a PDF usando jsPDF
 * @param {Object} datos - Datos del análisis
 */
function exportarPDF(datos) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        let y = 20;
        const lineHeight = 7;
        const margin = 20;
        
        // Header
        doc.setFontSize(18);
        doc.setTextColor(0, 114, 206); // Azul Sabadell
        doc.text('ICARIA Intelligence Platform', margin, y);
        y += lineHeight + 5;
        
        doc.setFontSize(10);
        doc.setTextColor(51, 51, 51); // Gris oscuro
        doc.text(`Fecha: ${formatearFecha(new Date())}`, margin, y);
        y += lineHeight + 5;
        
        // Línea separadora
        doc.setDrawColor(0, 114, 206);
        doc.line(margin, y, 190, y);
        y += lineHeight;
        
        // Resumen ejecutivo
        doc.setFontSize(14);
        doc.setTextColor(0, 61, 107); // Azul oscuro Sabadell
        doc.text('Resumen Ejecutivo', margin, y);
        y += lineHeight;
        
        doc.setFontSize(10);
        doc.setTextColor(51, 51, 51);
        doc.text(`Total Casos: ${datos.totalCasos || 0}`, margin, y);
        y += lineHeight;
        doc.text(`Cobertura Promedio: ${datos.coberturaPromedio || 0}%`, margin, y);
        y += lineHeight;
        doc.text(`Casos Modelados: ${datos.casosModelados || 0}`, margin, y);
        y += lineHeight;
        doc.text(`Casos Parciales: ${datos.casosParciales || 0}`, margin, y);
        y += lineHeight;
        doc.text(`Casos No Modelados: ${datos.casosNoModelados || 0}`, margin, y);
        y += lineHeight + 5;
        
        // Distribución de estados
        doc.setFontSize(14);
        doc.setTextColor(0, 61, 107);
        doc.text('Distribución de Estados', margin, y);
        y += lineHeight;
        
        doc.setFontSize(10);
        doc.setTextColor(51, 51, 51);
        
        // Modelada
        doc.setTextColor(0, 166, 81); // Verde
        doc.text(`• Modelada: ${datos.casosModelados || 0} (${datos.porcentajeModelada || 0}%)`, margin, y);
        y += lineHeight;
        
        // Parcial
        doc.setTextColor(255, 130, 0); // Naranja
        doc.text(`• Parcial: ${datos.casosParciales || 0} (${datos.porcentajeParcial || 0}%)`, margin, y);
        y += lineHeight;
        
        // No Modelada
        doc.setTextColor(227, 30, 36); // Rojo
        doc.text(`• No Modelada: ${datos.casosNoModelados || 0} (${datos.porcentajeNoModelada || 0}%)`, margin, y);
        y += lineHeight + 5;
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('© 2026 DXC Technology - Banco Sabadell S.A.', margin, 280);
        doc.text('ICARIA Intelligence Platform v2.0.0', margin, 285);
        
        // Guardar
        const nombreArchivo = `ICARIA_Reporte_${Date.now()}.pdf`;
        doc.save(nombreArchivo);
        
        log(`PDF exportado correctamente: ${nombreArchivo}`, 'info');
        return true;
        
    } catch (error) {
        log(`Error al exportar PDF: ${error.message}`, 'error');
        return false;
    }
}

/**
 * Algoritmo de distancia de Levenshtein para similitud de cadenas
 * @param {string} str1 - Primera cadena
 * @param {string} str2 - Segunda cadena
 * @returns {number} Distancia de Levenshtein
 */
function distanciaLevenshtein(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];
    
    // Inicializar matriz
    for (let i = 0; i <= len1; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= len2; j++) {
        matrix[0][j] = j;
    }
    
    // Calcular distancias
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,      // Eliminación
                matrix[i][j - 1] + 1,      // Inserción
                matrix[i - 1][j - 1] + cost // Sustitución
            );
        }
    }
    
    return matrix[len1][len2];
}

/**
 * Calcula similitud entre dos cadenas (0-100%)
 * @param {string} str1 - Primera cadena
 * @param {string} str2 - Segunda cadena
 * @returns {number} Porcentaje de similitud (0-100)
 */
function similitudCadenas(str1, str2) {
    if (!str1 || !str2) return 0;
    
    const norm1 = normalizarTexto(str1);
    const norm2 = normalizarTexto(str2);
    
    if (norm1 === norm2) return 100;
    
    const maxLen = Math.max(norm1.length, norm2.length);
    if (maxLen === 0) return 100;
    
    const distancia = distanciaLevenshtein(norm1, norm2);
    const similitud = ((maxLen - distancia) / maxLen) * 100;
    
    return Math.round(similitud);
}

/**
 * Normaliza texto para comparación
 * @param {string} texto - Texto a normalizar
 * @returns {string} Texto normalizado
 */
function normalizarTexto(texto) {
    if (!texto) return '';
    
    return texto
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/[^a-z0-9\s]/g, '')     // Eliminar caracteres especiales
        .replace(/\s+/g, ' ');            // Normalizar espacios
}

/**
 * Genera un ID único
 * @returns {string} ID único
 */
function generarID() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sistema de logging
 * @param {string} mensaje - Mensaje a registrar
 * @param {string} tipo - Tipo de log ('error', 'warn', 'info', 'debug')
 */
function log(mensaje, tipo = 'info') {
    if (!CONFIG.DEBUG) return;
    
    const timestamp = formatearFecha(new Date());
    const prefix = `[ICARIA ${timestamp}]`;
    
    const niveles = { error: 0, warn: 1, info: 2, debug: 3 };
    const nivelActual = niveles[CONFIG.LOG_LEVEL] || 2;
    const nivelMensaje = niveles[tipo] || 2;
    
    if (nivelMensaje <= nivelActual) {
        switch (tipo) {
            case 'error':
                console.error(prefix, mensaje);
                break;
            case 'warn':
                console.warn(prefix, mensaje);
                break;
            case 'debug':
                console.debug(prefix, mensaje);
                break;
            default:
                console.log(prefix, mensaje);
        }
    }
}

/**
 * Descarga un archivo de texto
 * @param {string} contenido - Contenido del archivo
 * @param {string} nombreArchivo - Nombre del archivo
 * @param {string} tipoMIME - Tipo MIME del archivo
 */
function descargarArchivo(contenido, nombreArchivo, tipoMIME = 'text/plain') {
    const blob = new Blob([contenido], { type: tipoMIME });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    log(`Archivo descargado: ${nombreArchivo}`, 'info');
}

/**
 * Muestra un mensaje toast/notificación
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de notificación ('success', 'error', 'warning', 'info')
 */
function mostrarNotificacion(mensaje, tipo = 'info') {
    // Si Bootstrap está disponible, usar toast
    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const toastContainer = document.getElementById('toast-container');
        if (toastContainer) {
            const colorClass = {
                success: 'bg-success',
                error: 'bg-danger',
                warning: 'bg-warning',
                info: 'bg-info'
            }[tipo] || 'bg-info';
            
            const toastHTML = `
                <div class="toast ${colorClass} text-white" role="alert">
                    <div class="toast-body">
                        ${mensaje}
                    </div>
                </div>
            `;
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = toastHTML;
            const toastElement = tempDiv.firstElementChild;
            
            toastContainer.appendChild(toastElement);
            const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
            toast.show();
            
            toastElement.addEventListener('hidden.bs.toast', () => {
                toastElement.remove();
            });
        }
    } else {
        // Fallback a alert
        alert(mensaje);
    }
}

/**
 * Formatea un número con separadores de miles
 * @param {number} numero - Número a formatear
 * @returns {string} Número formateado
 */
function formatearNumero(numero) {
    if (isNaN(numero)) return '0';
    return new Intl.NumberFormat('es-ES').format(numero);
}

/**
 * Calcula el porcentaje
 * @param {number} parte - Parte del total
 * @param {number} total - Total
 * @returns {number} Porcentaje redondeado
 */
function calcularPorcentaje(parte, total) {
    if (total === 0) return 0;
    return Math.round((parte / total) * 100);
}

/**
 * Trunca un texto a una longitud máxima
 * @param {string} texto - Texto a truncar
 * @param {number} maxLen - Longitud máxima
 * @returns {string} Texto truncado
 */
function truncarTexto(texto, maxLen = 100) {
    if (!texto || texto.length <= maxLen) return texto;
    return texto.substring(0, maxLen) + '...';
}

/**
 * Debounce function para optimizar búsquedas
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatearFecha,
        validarArchivo,
        exportarMarkdown,
        exportarPDF,
        distanciaLevenshtein,
        similitudCadenas,
        normalizarTexto,
        generarID,
        log,
        descargarArchivo,
        mostrarNotificacion,
        formatearNumero,
        calcularPorcentaje,
        truncarTexto,
        debounce
    };
}
