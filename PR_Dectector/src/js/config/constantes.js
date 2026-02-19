/**
 * ICARIA Intelligence Platform - Configuración Global
 * 
 * @version 2.0.0
 * @author Antonio Rodriguez Smith - DXC Technology
 * @client Banco Sabadell S.A. - TDM Department
 * @confidential
 */

const CONFIG = {
    // Información del proyecto
    VERSION: '2.2.0',
    NOMBRE: 'ICARIA Intelligence Platform',
    CLIENTE: 'Banco Sabadell S.A.',
    DEPARTAMENTO: 'TDM',
    
    // Límites de procesamiento
    MAX_CASOS: 100,
    MAX_CONDICIONES: 200,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    
    // Thresholds de scoring
    THRESHOLD_MODELADA: 80,      // ≥80% → Modelada
    THRESHOLD_PARCIAL: 40,       // 40-79% → Parcial
    // threshold <40% → No Modelada
    
    // Formatos permitidos
    FORMATOS_PERMITIDOS: ['.md', '.txt'],
    
    // Colores corporativos Banco Sabadell
    COLORES: {
        // Estados de cobertura
        MODELADA: '#00A651',        // Verde Sabadell
        PARCIAL: '#FF8200',         // Naranja Sabadell
        NO_MODELADA: '#E31E24',     // Rojo Sabadell
        
        // Colores principales
        PRINCIPAL: '#0072CE',        // Azul principal Sabadell
        SECUNDARIO: '#003D6B',       // Azul oscuro Sabadell
        CLARO: '#4DA6E8',           // Azul claro Sabadell
        
        // Colores adicionales
        FONDO: '#F5F5F5',           // Gris claro
        TEXTO: '#333333',           // Gris oscuro
        BLANCO: '#FFFFFF'
    },
    
    // Mensajes del sistema
    MENSAJES: {
        ERROR_FORMATO: 'Formato de archivo no permitido. Use .md o .txt',
        ERROR_TAMAÑO: 'Archivo demasiado grande. Máximo 5MB',
        ERROR_CARGA: 'Error al cargar el archivo',
        EXITO_CARGA: 'Archivo cargado correctamente',
        PROCESANDO: 'Procesando análisis...',
        COMPLETADO: 'Análisis completado'
    },
    
    // Configuración de DataTables
    DATATABLES_CONFIG: {
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        },
        pageLength: 25,
        responsive: true,
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel']
    },
    
    // Configuración de Chart.js
    CHART_CONFIG: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    },
    
    // Arquetipos predefinidos
    ARQUETIPOS_PREDEFINIDOS: [
        {
            id: 'Q48',
            nombre: 'Compra de acciones en oficina (COMPLETO)',
            descripcion: 'Operación completa con compliance',
            condiciones: ['TEST_DIVISA_EUR', 'CANAL_OFICINA', 'OPERACION_COMPRA', 'TEST_CF', 'TEST_TC', 'SALDO_DV01']
        },
        {
            id: 'Q49',
            nombre: 'Arquetipo Q49',
            descripcion: 'Orden limitada con fecha valor hoy',
            condiciones: ['TIPO_ORDEN_LIMITADA', 'FECHA_VALOR_HOY']
        },
        {
            id: 'Q63',
            nombre: 'Arquetipo Q63',
            descripcion: 'Operación completa de compra',
            condiciones: ['OPERACION_COMPRA', 'TEST_DIVISA_EUR', 'CANAL_OFICINA', 'FECHA_VALOR_HOY']
        }
    ],
    
    // Dominios de condiciones
    DOMINIOS: {
        OPERATIVA: 'Operativa',
        TEMPORAL: 'Temporal',
        FINANCIERA: 'Financiera',
        NORMATIVA: 'Normativa',
        PERFIL: 'Perfil Usuario'
    },
    
    // Configuración de exportación
    EXPORT_CONFIG: {
        PDF: {
            formato: 'a4',
            orientacion: 'portrait',
            margenes: { top: 20, right: 20, bottom: 20, left: 20 }
        },
        MARKDOWN: {
            header: '# Reporte ICARIA Intelligence Platform\n\n',
            footer: '\n\n---\n*Generado por ICARIA Intelligence Platform v2.2.0*\n*© 2026 DXC Technology - Banco Sabadell S.A.*'
        }
    },
    
    // LocalStorage keys
    STORAGE_KEYS: {
        ARQUETIPOS: 'icaria_arquetipos',
        PREFERENCIAS: 'icaria_preferencias',
        ULTIMO_ANALISIS: 'icaria_ultimo_analisis'
    },
    
    // Debugging
    DEBUG: true,
    LOG_LEVEL: 'info' // 'error', 'warn', 'info', 'debug'
};

// Congelar el objeto para evitar modificaciones
Object.freeze(CONFIG);
Object.freeze(CONFIG.COLORES);
Object.freeze(CONFIG.MENSAJES);
Object.freeze(CONFIG.DOMINIOS);

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
