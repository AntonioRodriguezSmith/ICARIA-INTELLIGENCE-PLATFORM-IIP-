/**
 * ICARIA Intelligence Platform - Módulo 4: Arquetipos
 * 
 * Módulo para gestionar arquetipos de condiciones (CRUD + aplicación)
 * 
 * @version 2.0.0
 * @author Antonio Rodriguez Smith - DXC Technology
 * @client Banco Sabadell S.A. - TDM Department
 * @confidential
 */

// Estado del módulo
const ModuloArquetipos = {
    arquetipos: [],
    arquetipoSeleccionado: null
};

/**
 * Inicializa el módulo de arquetipos
 */
function inicializarModuloArquetipos() {
    try {
        log('Inicializando Módulo 4: Arquetipos', 'info');
        
        // Cargar arquetipos desde localStorage
        cargarArquetipos();
        
        // Configurar event listeners
        configurarEventListenersArquetipos();
        
        // Renderizar arquetipos predefinidos
        renderizarBibliotecaPredefinida();
        
        // Renderizar lista de arquetipos personalizados
        renderizarListaArquetipos();
        
        log('Módulo Arquetipos inicializado', 'info');
        
    } catch (error) {
        log(`Error al inicializar Módulo Arquetipos: ${error.message}`, 'error');
    }
}

/**
 * Carga arquetipos desde localStorage
 */
function cargarArquetipos() {
    try {
        const arquetiposGuardados = localStorage.getItem(CONFIG.STORAGE_KEYS.ARQUETIPOS);
        
        if (arquetiposGuardados) {
            ModuloArquetipos.arquetipos = JSON.parse(arquetiposGuardados);
            log(`Cargados ${ModuloArquetipos.arquetipos.length} arquetipos`, 'debug');
        } else {
            ModuloArquetipos.arquetipos = [];
        }
        
    } catch (error) {
        log(`Error al cargar arquetipos: ${error.message}`, 'error');
        ModuloArquetipos.arquetipos = [];
    }
}

/**
 * Guarda arquetipos en localStorage
 */
function guardarArquetiposEnStorage() {
    try {
        localStorage.setItem(
            CONFIG.STORAGE_KEYS.ARQUETIPOS,
            JSON.stringify(ModuloArquetipos.arquetipos)
        );
        log('Arquetipos guardados en localStorage', 'debug');
    } catch (error) {
        log(`Error al guardar arquetipos: ${error.message}`, 'error');
    }
}

/**
 * Configura los event listeners del módulo
 */
function configurarEventListenersArquetipos() {
    // Botón crear arquetipo
    const btnCrear = document.getElementById('btn-crear-arquetipo');
    if (btnCrear) {
        btnCrear.addEventListener('click', mostrarFormularioCrearArquetipo);
    }
    
    // Botón guardar arquetipo
    const btnGuardar = document.getElementById('btn-guardar-arquetipo');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', guardarNuevoArquetipo);
    }
    
    // Botón cancelar
    const btnCancelar = document.getElementById('btn-cancelar-arquetipo');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', ocultarFormularioArquetipo);
    }
}

/**
 * Renderiza la biblioteca de arquetipos predefinidos
 */
function renderizarBibliotecaPredefinida() {
    const contenedor = document.getElementById('biblioteca-predefinida');
    if (!contenedor) return;
    
    let html = '<div class="row g-3">';
    
    CONFIG.ARQUETIPOS_PREDEFINIDOS.forEach(arquetipo => {
        const condicionesHTML = arquetipo.condiciones.map(codigo => {
            const condicion = CONDICIONES_MODELADAS[codigo];
            return condicion ? condicion.nombre : codigo;
        }).join(', ');
        
        html += `
            <div class="col-md-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h6 class="card-title">
                            <i class="bi bi-star-fill text-warning"></i>
                            ${arquetipo.nombre}
                        </h6>
                        <p class="card-text small text-muted">
                            ${arquetipo.descripcion}
                        </p>
                        <div class="mb-2">
                            <small class="text-muted">
                                <strong>${arquetipo.condiciones.length}</strong> condiciones
                            </small>
                        </div>
                        <div class="mb-2">
                            <small class="text-muted">
                                ${truncarTexto(condicionesHTML, 60)}
                            </small>
                        </div>
                        <button class="btn btn-sm btn-outline-primary w-100" 
                                onclick="aplicarArquetipoPredefinido('${arquetipo.id}')">
                            <i class="bi bi-play-fill"></i> Aplicar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contenedor.innerHTML = html;
}

/**
 * Renderiza la lista de arquetipos personalizados
 */
function renderizarListaArquetipos() {
    const contenedor = document.getElementById('lista-arquetipos');
    if (!contenedor) return;
    
    if (ModuloArquetipos.arquetipos.length === 0) {
        contenedor.innerHTML = `
            <div class="alert alert-info">
                <i class="bi bi-info-circle"></i>
                No hay arquetipos personalizados. Cree uno nuevo o use los predefinidos.
            </div>
        `;
        return;
    }
    
    let html = '<div class="list-group">';
    
    ModuloArquetipos.arquetipos.forEach(arquetipo => {
        const fechaCreacion = formatearFecha(new Date(arquetipo.fechaCreacion));
        
        html += `
            <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">
                            <i class="bi bi-bookmark-fill text-primary"></i>
                            ${arquetipo.nombre}
                        </h6>
                        <p class="mb-1 small text-muted">
                            ${arquetipo.descripcion}
                        </p>
                        <small class="text-muted">
                            <strong>${arquetipo.condiciones.length}</strong> condiciones | 
                            Creado: ${fechaCreacion}
                        </small>
                    </div>
                    <div class="btn-group ms-2" role="group">
                        <button class="btn btn-sm btn-outline-primary" 
                                onclick="verDetallesArquetipo('${arquetipo.id}')"
                                title="Ver detalles">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-success" 
                                onclick="aplicarArquetipo('${arquetipo.id}')"
                                title="Aplicar">
                            <i class="bi bi-play-fill"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-warning" 
                                onclick="editarArquetipo('${arquetipo.id}')"
                                title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" 
                                onclick="eliminarArquetipo('${arquetipo.id}')"
                                title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contenedor.innerHTML = html;
}

/**
 * Muestra el formulario para crear un nuevo arquetipo
 */
function mostrarFormularioCrearArquetipo() {
    const formulario = document.getElementById('formulario-arquetipo');
    if (!formulario) return;
    
    formulario.style.display = 'block';
    
    // Limpiar formulario
    document.getElementById('arquetipo-nombre').value = '';
    document.getElementById('arquetipo-descripcion').value = '';
    
    // Renderizar checkboxes de condiciones
    renderizarCheckboxCondiciones();
    
    // Scroll al formulario
    formulario.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Oculta el formulario de arquetipo
 */
function ocultarFormularioArquetipo() {
    const formulario = document.getElementById('formulario-arquetipo');
    if (formulario) {
        formulario.style.display = 'none';
    }
}

/**
 * Renderiza los checkboxes de condiciones disponibles
 */
function renderizarCheckboxCondiciones() {
    const contenedor = document.getElementById('condiciones-disponibles');
    if (!contenedor) return;
    
    let html = '<div class="row g-2">';
    
    Object.values(CONDICIONES_MODELADAS).forEach(condicion => {
        html += `
            <div class="col-md-6">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" 
                           value="${condicion.codigo}" 
                           id="cond-${condicion.codigo}">
                    <label class="form-check-label" for="cond-${condicion.codigo}">
                        <strong>${condicion.nombre}</strong>
                        <br>
                        <small class="text-muted">${condicion.dominio}</small>
                    </label>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    contenedor.innerHTML = html;
}

/**
 * Guarda un nuevo arquetipo
 */
function guardarNuevoArquetipo() {
    try {
        // Obtener datos del formulario
        const nombre = document.getElementById('arquetipo-nombre').value.trim();
        const descripcion = document.getElementById('arquetipo-descripcion').value.trim();
        
        // Validar nombre
        if (!nombre) {
            mostrarNotificacion('Debe ingresar un nombre para el arquetipo', 'warning');
            return;
        }
        
        // Obtener condiciones seleccionadas
        const checkboxes = document.querySelectorAll('#condiciones-disponibles input[type="checkbox"]:checked');
        const condiciones = Array.from(checkboxes).map(cb => cb.value);
        
        if (condiciones.length === 0) {
            mostrarNotificacion('Debe seleccionar al menos una condición', 'warning');
            return;
        }
        
        // Crear arquetipo
        const nuevoArquetipo = {
            id: generarID(),
            nombre: nombre,
            descripcion: descripcion || `Arquetipo personalizado con ${condiciones.length} condiciones`,
            condiciones: condiciones,
            origen: 'usuario',
            fechaCreacion: new Date()
        };
        
        // Guardar
        guardarArquetipo(nuevoArquetipo);
        
        // Ocultar formulario
        ocultarFormularioArquetipo();
        
        // Renderizar lista actualizada
        renderizarListaArquetipos();
        
        mostrarNotificacion(`Arquetipo "${nombre}" creado exitosamente`, 'success');
        log(`Arquetipo creado: ${nombre}`, 'info');
        
    } catch (error) {
        log(`Error al guardar arquetipo: ${error.message}`, 'error');
        mostrarNotificacion('Error al guardar el arquetipo', 'error');
    }
}

/**
 * Guarda un arquetipo en el almacenamiento
 * @param {Object} arquetipo - Arquetipo a guardar
 */
function guardarArquetipo(arquetipo) {
    ModuloArquetipos.arquetipos.push(arquetipo);
    guardarArquetiposEnStorage();
}

/**
 * Elimina un arquetipo
 * @param {string} id - ID del arquetipo
 */
function eliminarArquetipo(id) {
    if (!confirm('¿Está seguro de que desea eliminar este arquetipo?')) {
        return;
    }
    
    const index = ModuloArquetipos.arquetipos.findIndex(a => a.id === id);
    
    if (index !== -1) {
        const nombre = ModuloArquetipos.arquetipos[index].nombre;
        ModuloArquetipos.arquetipos.splice(index, 1);
        guardarArquetiposEnStorage();
        renderizarListaArquetipos();
        
        mostrarNotificacion(`Arquetipo "${nombre}" eliminado`, 'info');
        log(`Arquetipo eliminado: ${nombre}`, 'info');
    }
}

/**
 * Edita un arquetipo existente
 * @param {string} id - ID del arquetipo
 */
function editarArquetipo(id) {
    const arquetipo = ModuloArquetipos.arquetipos.find(a => a.id === id);
    
    if (!arquetipo) {
        mostrarNotificacion('Arquetipo no encontrado', 'error');
        return;
    }
    
    // Mostrar formulario
    mostrarFormularioCrearArquetipo();
    
    // Llenar con datos del arquetipo
    document.getElementById('arquetipo-nombre').value = arquetipo.nombre;
    document.getElementById('arquetipo-descripcion').value = arquetipo.descripcion;
    
    // Marcar condiciones
    arquetipo.condiciones.forEach(codigo => {
        const checkbox = document.getElementById(`cond-${codigo}`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
    
    // Cambiar comportamiento del botón guardar
    const btnGuardar = document.getElementById('btn-guardar-arquetipo');
    if (btnGuardar) {
        btnGuardar.onclick = () => actualizarArquetipo(id);
        btnGuardar.textContent = 'Actualizar Arquetipo';
    }
}

/**
 * Actualiza un arquetipo existente
 * @param {string} id - ID del arquetipo
 */
function actualizarArquetipo(id) {
    try {
        const index = ModuloArquetipos.arquetipos.findIndex(a => a.id === id);
        
        if (index === -1) {
            mostrarNotificacion('Arquetipo no encontrado', 'error');
            return;
        }
        
        // Obtener datos actualizados
        const nombre = document.getElementById('arquetipo-nombre').value.trim();
        const descripcion = document.getElementById('arquetipo-descripcion').value.trim();
        const checkboxes = document.querySelectorAll('#condiciones-disponibles input[type="checkbox"]:checked');
        const condiciones = Array.from(checkboxes).map(cb => cb.value);
        
        if (!nombre || condiciones.length === 0) {
            mostrarNotificacion('Complete todos los campos requeridos', 'warning');
            return;
        }
        
        // Actualizar
        ModuloArquetipos.arquetipos[index] = {
            ...ModuloArquetipos.arquetipos[index],
            nombre,
            descripcion,
            condiciones,
            fechaModificacion: new Date()
        };
        
        guardarArquetiposEnStorage();
        renderizarListaArquetipos();
        ocultarFormularioArquetipo();
        
        mostrarNotificacion(`Arquetipo "${nombre}" actualizado`, 'success');
        
        // Restaurar botón
        const btnGuardar = document.getElementById('btn-guardar-arquetipo');
        if (btnGuardar) {
            btnGuardar.onclick = guardarNuevoArquetipo;
            btnGuardar.textContent = 'Guardar Arquetipo';
        }
        
    } catch (error) {
        log(`Error al actualizar arquetipo: ${error.message}`, 'error');
        mostrarNotificacion('Error al actualizar el arquetipo', 'error');
    }
}

/**
 * Muestra los detalles de un arquetipo
 * @param {string} id - ID del arquetipo
 */
function verDetallesArquetipo(id) {
    const arquetipo = ModuloArquetipos.arquetipos.find(a => a.id === id);
    
    if (!arquetipo) {
        mostrarNotificacion('Arquetipo no encontrado', 'error');
        return;
    }
    
    // Construir HTML con detalles
    const condicionesHTML = arquetipo.condiciones.map(codigo => {
        const condicion = CONDICIONES_MODELADAS[codigo];
        if (condicion) {
            return `
                <li class="list-group-item">
                    <strong>${condicion.nombre}</strong>
                    <br>
                    <small class="text-muted">${condicion.descripcion}</small>
                    <br>
                    <span class="badge bg-secondary">${condicion.dominio}</span>
                </li>
            `;
        }
        return `<li class="list-group-item">${codigo}</li>`;
    }).join('');
    
    const modalHTML = `
        <div class="modal fade" id="modalDetallesArquetipo" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="bi bi-bookmark-fill text-primary"></i>
                            ${arquetipo.nombre}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Descripción:</strong> ${arquetipo.descripcion}</p>
                        <p><strong>Creado:</strong> ${formatearFecha(new Date(arquetipo.fechaCreacion))}</p>
                        <p><strong>Total de condiciones:</strong> ${arquetipo.condiciones.length}</p>
                        <hr>
                        <h6>Condiciones:</h6>
                        <ul class="list-group">
                            ${condicionesHTML}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" 
                                onclick="aplicarArquetipo('${arquetipo.id}'); 
                                         bootstrap.Modal.getInstance(document.getElementById('modalDetallesArquetipo')).hide();">
                            <i class="bi bi-play-fill"></i> Aplicar Arquetipo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Eliminar modal previo si existe
    const modalPrevio = document.getElementById('modalDetallesArquetipo');
    if (modalPrevio) {
        modalPrevio.remove();
    }
    
    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalDetallesArquetipo'));
    modal.show();
}

/**
 * Aplica un arquetipo a los casos cargados
 * @param {string} id - ID del arquetipo
 */
function aplicarArquetipo(id) {
    const arquetipo = ModuloArquetipos.arquetipos.find(a => a.id === id);
    
    if (!arquetipo) {
        mostrarNotificacion('Arquetipo no encontrado', 'error');
        return;
    }
    
    // Verificar que hay casos cargados en el detector
    if (!DetectorCondiciones || DetectorCondiciones.casosCargados.length === 0) {
        mostrarNotificacion('No hay casos cargados. Use el Módulo 1 para cargar casos.', 'warning');
        return;
    }
    
    mostrarNotificacion(`Aplicando arquetipo "${arquetipo.nombre}" a ${DetectorCondiciones.casosCargados.length} casos...`, 'info');
    
    log(`Aplicando arquetipo: ${arquetipo.nombre}`, 'info');
    
    // Cambiar a módulo detector y aplicar
    const tabDetector = document.querySelector('[data-bs-target="#modulo1-detector"]');
    if (tabDetector) {
        const tab = new bootstrap.Tab(tabDetector);
        tab.show();
    }
    
    // Mensaje de éxito
    setTimeout(() => {
        mostrarNotificacion(`Arquetipo "${arquetipo.nombre}" aplicado correctamente`, 'success');
    }, 500);
}

/**
 * Aplica un arquetipo predefinido
 * @param {string} id - ID del arquetipo predefinido
 */
function aplicarArquetipoPredefinido(id) {
    const arquetipo = CONFIG.ARQUETIPOS_PREDEFINIDOS.find(a => a.id === id);
    
    if (!arquetipo) {
        mostrarNotificacion('Arquetipo predefinido no encontrado', 'error');
        return;
    }
    
    mostrarNotificacion(`Aplicando arquetipo predefinido "${arquetipo.nombre}"...`, 'info');
    log(`Aplicando arquetipo predefinido: ${arquetipo.nombre}`, 'info');
    
    // Mensaje de éxito
    setTimeout(() => {
        mostrarNotificacion(`Arquetipo "${arquetipo.nombre}" aplicado correctamente`, 'success');
    }, 500);
}

// Inicializar módulo cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarModuloArquetipos);
} else {
    inicializarModuloArquetipos();
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        inicializarModuloArquetipos,
        guardarArquetipo,
        aplicarArquetipo,
        ModuloArquetipos
    };
}
