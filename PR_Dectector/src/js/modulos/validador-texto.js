/**
 * ICARIA Intelligence Platform - Módulo 3: Validador de Texto Individual
 * 
 * Módulo para validar texto libre contra el catálogo de condiciones ICARIA
 * 
 * @version 2.0.0
 * @author Antonio Rodriguez Smith - DXC Technology
 * @client Banco Sabadell S.A. - TDM Department
 * @confidential
 */

// Estado del módulo
const ValidadorTexto = {
    ultimaBusqueda: null,
    resultados: []
};

/**
 * Inicializa el módulo de validador de texto
 */
function inicializarValidadorTexto() {
    try {
        log('Inicializando Módulo 3: Validador de Texto', 'info');
        
        // Configurar event listeners
        configurarEventListenersValidador();
        
        // Cargar catálogo predefinido
        cargarCatalogoPredefinido();
        
        log('Módulo Validador de Texto inicializado', 'info');
        
    } catch (error) {
        log(`Error al inicializar Validador de Texto: ${error.message}`, 'error');
    }
}

/**
 * Configura los event listeners del validador
 */
function configurarEventListenersValidador() {
    // Textarea de entrada
    const inputTexto = document.getElementById('validador-input-texto');
    if (inputTexto) {
        // Usar debounce para evitar búsquedas excesivas
        const busquedaDebounced = debounce(() => {
            ejecutarValidacion();
        }, 500);
        
        inputTexto.addEventListener('input', busquedaDebounced);
    }
    
    // Botón de búsqueda
    const btnBuscar = document.getElementById('btn-validar-texto');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', ejecutarValidacion);
    }
    
    // Botón limpiar
    const btnLimpiar = document.getElementById('btn-limpiar-validador');
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarValidador);
    }
    
    // Botón crear arquetipo desde validación
    const btnCrearArquetipo = document.getElementById('btn-crear-arquetipo-desde-validador');
    if (btnCrearArquetipo) {
        btnCrearArquetipo.addEventListener('click', crearArquetipoDesdeValidacion);
    }
}

/**
 * Carga el catálogo predefinido de condiciones
 */
function cargarCatalogoPredefinido() {
    const elemCatalogo = document.getElementById('catalogo-condiciones-info');
    if (elemCatalogo) {
        const totalCondiciones = Object.keys(CONDICIONES_MODELADAS).length;
        elemCatalogo.innerHTML = `
            <div class="alert alert-info">
                <i class="bi bi-database"></i>
                <strong>Catálogo cargado:</strong> ${totalCondiciones} condiciones ICARIA modeladas
            </div>
        `;
    }
}

/**
 * Ejecuta la validación del texto ingresado
 */
function ejecutarValidacion() {
    try {
        const inputTexto = document.getElementById('validador-input-texto');
        if (!inputTexto) return;
        
        const texto = inputTexto.value.trim();
        
        // Validar que hay texto
        if (!texto || texto.length < 3) {
            mostrarResultadosValidacion([]);
            return;
        }
        
        ValidadorTexto.ultimaBusqueda = texto;
        
        log(`Validando texto: "${truncarTexto(texto, 50)}"`, 'debug');
        
        // Buscar en catálogo
        const resultados = buscarEnCatalogo(texto);
        
        ValidadorTexto.resultados = resultados;
        
        // Mostrar resultados
        mostrarResultadosValidacion(resultados);
        
        // Calcular scoring general
        const scoringGeneral = calcularScoringGeneral(resultados);
        mostrarScoringGeneral(scoringGeneral);
        
    } catch (error) {
        log(`Error en validación: ${error.message}`, 'error');
        mostrarNotificacion('Error al validar el texto', 'error');
    }
}

/**
 * Muestra los resultados de la validación
 * @param {Array<Object>} resultados - Resultados de la búsqueda
 */
function mostrarResultadosValidacion(resultados) {
    const contenedor = document.getElementById('resultados-validacion');
    if (!contenedor) return;
    
    if (resultados.length === 0) {
        contenedor.innerHTML = `
            <div class="alert alert-secondary">
                <i class="bi bi-search"></i>
                ${ValidadorTexto.ultimaBusqueda 
                    ? 'No se encontraron coincidencias. Intente con otros términos.' 
                    : 'Ingrese un texto para buscar condiciones similares'}
            </div>
        `;
        return;
    }
    
    let html = '<div class="list-group">';
    
    resultados.forEach((resultado, index) => {
        const condicion = resultado.condicion;
        const similitud = resultado.similitud;
        
        // Determinar clase de badge según similitud
        let badgeClass = 'secondary';
        if (similitud >= 80) badgeClass = 'success';
        else if (similitud >= 60) badgeClass = 'warning';
        else if (similitud >= 40) badgeClass = 'info';
        
        // Determinar icono según estado
        const icono = resultado.estado === 'Modelada' 
            ? '<i class="bi bi-check-circle-fill text-success"></i>' 
            : '<i class="bi bi-exclamation-circle-fill text-warning"></i>';
        
        html += `
            <div class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between align-items-center">
                    <h6 class="mb-1">
                        ${icono}
                        ${condicion.nombre}
                    </h6>
                    <span class="badge bg-${badgeClass}">${similitud}%</span>
                </div>
                <p class="mb-1 text-muted small">
                    ${condicion.descripcion || ''}
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">
                        <strong>Dominio:</strong> ${condicion.dominio} | 
                        <strong>Código:</strong> ${condicion.codigo}
                    </small>
                    <span class="badge bg-${resultado.estado === 'Modelada' ? 'success' : 'secondary'}">
                        ${resultado.estado}
                    </span>
                </div>
                ${condicion.keywords ? `
                    <div class="mt-2">
                        <small class="text-muted">
                            <strong>Keywords:</strong> 
                            ${condicion.keywords.slice(0, 5).map(k => 
                                `<span class="badge bg-light text-dark">${k}</span>`
                            ).join(' ')}
                        </small>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    
    contenedor.innerHTML = html;
    
    // Mostrar botón de crear arquetipo si hay buenos resultados
    const btnCrearArquetipo = document.getElementById('btn-crear-arquetipo-desde-validador');
    if (btnCrearArquetipo) {
        const hayBuenasCoincidencias = resultados.some(r => r.similitud >= 70);
        btnCrearArquetipo.style.display = hayBuenasCoincidencias ? 'inline-block' : 'none';
    }
}

/**
 * Calcula el scoring general de la validación
 * @param {Array<Object>} resultados - Resultados de la búsqueda
 * @returns {number} Scoring 0-100
 */
function calcularScoringGeneral(resultados) {
    if (!resultados || resultados.length === 0) return 0;
    
    // Tomar las 3 mejores coincidencias
    const mejores = resultados.slice(0, 3);
    
    // Calcular promedio ponderado (primero tiene más peso)
    const pesos = [0.5, 0.3, 0.2];
    let scoringPonderado = 0;
    
    mejores.forEach((resultado, index) => {
        const peso = pesos[index] || 0.1;
        scoringPonderado += resultado.similitud * peso;
    });
    
    return Math.round(scoringPonderado);
}

/**
 * Muestra el scoring general de la validación
 * @param {number} scoring - Scoring calculado
 */
function mostrarScoringGeneral(scoring) {
    const elemScoring = document.getElementById('scoring-validacion');
    if (!elemScoring) return;
    
    // Determinar estado según threshold
    let estado = 'No Modelada';
    let colorClass = 'danger';
    
    if (scoring >= CONFIG.THRESHOLD_MODELADA) {
        estado = 'Modelada';
        colorClass = 'success';
    } else if (scoring >= CONFIG.THRESHOLD_PARCIAL) {
        estado = 'Parcial';
        colorClass = 'warning';
    }
    
    elemScoring.innerHTML = `
        <div class="card border-${colorClass}">
            <div class="card-body text-center">
                <h3 class="text-${colorClass} mb-0">${scoring}%</h3>
                <p class="mb-0">
                    <span class="badge bg-${colorClass}">${estado}</span>
                </p>
                <small class="text-muted">Scoring de Similitud</small>
            </div>
        </div>
    `;
}

/**
 * Limpia el validador
 */
function limpiarValidador() {
    // Limpiar input
    const inputTexto = document.getElementById('validador-input-texto');
    if (inputTexto) {
        inputTexto.value = '';
    }
    
    // Limpiar resultados
    ValidadorTexto.ultimaBusqueda = null;
    ValidadorTexto.resultados = [];
    
    mostrarResultadosValidacion([]);
    
    const elemScoring = document.getElementById('scoring-validacion');
    if (elemScoring) {
        elemScoring.innerHTML = '';
    }
    
    log('Validador limpiado', 'debug');
}

/**
 * Crea un arquetipo desde la validación actual
 */
function crearArquetipoDesdeValidacion() {
    if (!ValidadorTexto.resultados || ValidadorTexto.resultados.length === 0) {
        mostrarNotificacion('No hay resultados para crear un arquetipo', 'warning');
        return;
    }
    
    // Obtener las condiciones con alta similitud (>= 70%)
    const condicionesAltas = ValidadorTexto.resultados
        .filter(r => r.similitud >= 70 && r.estado === 'Modelada')
        .map(r => r.condicion.codigo);
    
    if (condicionesAltas.length === 0) {
        mostrarNotificacion('No hay suficientes coincidencias modeladas para crear un arquetipo', 'warning');
        return;
    }
    
    // Crear nombre del arquetipo
    const nombreArquetipo = prompt('Ingrese un nombre para el arquetipo:');
    if (!nombreArquetipo) return;
    
    // Crear arquetipo
    const nuevoArquetipo = {
        id: generarID(),
        nombre: nombreArquetipo,
        descripcion: `Arquetipo generado desde validador: ${truncarTexto(ValidadorTexto.ultimaBusqueda, 100)}`,
        condiciones: condicionesAltas,
        origen: 'validador',
        fechaCreacion: new Date()
    };
    
    // Guardar en arquetipos
    if (typeof guardarArquetipo === 'function') {
        guardarArquetipo(nuevoArquetipo);
        mostrarNotificacion(`Arquetipo "${nombreArquetipo}" creado exitosamente`, 'success');
        
        // Cambiar a módulo de arquetipos
        const tabArquetipos = document.querySelector('[data-bs-target="#modulo4-arquetipos"]');
        if (tabArquetipos) {
            const tab = new bootstrap.Tab(tabArquetipos);
            tab.show();
        }
    } else {
        // Fallback: guardar en localStorage
        const arquetiposGuardados = JSON.parse(
            localStorage.getItem(CONFIG.STORAGE_KEYS.ARQUETIPOS) || '[]'
        );
        
        arquetiposGuardados.push(nuevoArquetipo);
        
        localStorage.setItem(
            CONFIG.STORAGE_KEYS.ARQUETIPOS, 
            JSON.stringify(arquetiposGuardados)
        );
        
        mostrarNotificacion(`Arquetipo "${nombreArquetipo}" guardado en localStorage`, 'success');
    }
    
    log(`Arquetipo creado: ${nombreArquetipo}`, 'info');
}

/**
 * Renderiza sugerencias en tiempo real mientras el usuario escribe
 * @param {string} texto - Texto actual
 */
function mostrarSugerencias(texto) {
    if (!texto || texto.length < 3) return;
    
    const sugerencias = buscarEnCatalogo(texto).slice(0, 5);
    
    const elemSugerencias = document.getElementById('sugerencias-validador');
    if (!elemSugerencias) return;
    
    if (sugerencias.length === 0) {
        elemSugerencias.innerHTML = '';
        return;
    }
    
    let html = '<div class="list-group list-group-flush">';
    html += '<small class="text-muted px-3 py-1"><strong>Sugerencias:</strong></small>';
    
    sugerencias.forEach(sug => {
        html += `
            <a href="#" class="list-group-item list-group-item-action py-1 px-3 small" 
               onclick="seleccionarSugerencia('${sug.condicion.nombre}'); return false;">
                ${sug.condicion.nombre} <span class="badge bg-secondary">${sug.similitud}%</span>
            </a>
        `;
    });
    
    html += '</div>';
    elemSugerencias.innerHTML = html;
}

/**
 * Selecciona una sugerencia y la aplica al input
 * @param {string} texto - Texto de la sugerencia
 */
function seleccionarSugerencia(texto) {
    const inputTexto = document.getElementById('validador-input-texto');
    if (inputTexto) {
        inputTexto.value = texto;
        ejecutarValidacion();
    }
    
    const elemSugerencias = document.getElementById('sugerencias-validador');
    if (elemSugerencias) {
        elemSugerencias.innerHTML = '';
    }
}

// Inicializar módulo cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarValidadorTexto);
} else {
    inicializarValidadorTexto();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        inicializarValidadorTexto,
        ejecutarValidacion,
        limpiarValidador,
        ValidadorTexto
    };
}
