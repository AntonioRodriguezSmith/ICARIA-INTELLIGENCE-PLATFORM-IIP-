
# KPIs — Resumen (Casos Broker)

**Total casos:** 67

### Distribución por estado (casos)

| Estado       | Casos | % sobre total |
|--------------|------:|--------------:|
| PARCIAL      |    34 |        50.7% |
| NO_MODELADA  |    21 |        31.3% |
| SIN_DATOS    |    11 |        16.4% |
| NO_APLICABLE |     1 |         1.5% |

---

## RESUMEN GENERAL

- **Total de condiciones diferentes identificadas:** 13
- **Modeladas (catálogo ICARIA):** 7
- **No modeladas:** 6

### ✅ Condiciones modeladas (en ICARIA)

| Nº | Condición | Casos afectados | % | Criticidad |
|---:|-----------|----------------:|---:|-----------|
| 1 | TIENE_BANCA_A_DISTANCIA | 80/80 | 100% | 🟢 Modelada |
| 2 | TIENE_CUENTA_VISTA | 56/80 | 70% | 🟢 Modelada |
| 3 | ES_TITULAR_ACTIVO_AVISOS_ALERTAS | 35/80 | 44% | 🟢 Modelada |
| 4 | TIPO_DE_FIRMA_DIGITAL_BSO (VTPC1/VTPC2) | 59/80 | 74% | 🟢 Modelada |
| 5 | TIENE_TARJETA_PAGO_ACTIVA | 12/80 | 15% | 🟢 Modelada |
| 6 | DOC_VIGENTE / DOC_CADUCADO | 8/80 | 10% | 🟢 Modelada |
| 7 | TIENE_LINEA_EXPANSION_ACTIVA | 6/80 | 8% | 🟢 Modelada |

### ❌ Condiciones no modeladas

| Nº | Condición | Casos afectados | % | Criticidad |
|---:|-----------|----------------:|---:|-----------|
| 8 | DOCUMENTOS_PENDIENTES_FIRMA_OTROS | 29/80 | 36% | 🟠 Alta |
| 9 | USUARIO_CONSULTIVO_DADO_DE_ALTA | 8/80 | 10% | 🟡 Baja |
| 10 | USUARIO_BIZUM_OTRA_ENTIDAD | 11/80 | 14% | 🟡 Media |
| 11 | USUARIO_ENROLADO_DISPOSITIVO | 18/80 | 23% | 🟠 Alta |
| 12 | WHITELIST_BIZUM | 4/80 | 5% | 🟡 Baja |
| 13 | CUENTA_MARCADA_NO_VISUALIZAR_POR_BSO | 2/80 | 2% | 🟡 Baja |

*Ver `Detector/reglas/Kpis/condiciones_desglose.md` para el listado completo y conteos por condición.*
