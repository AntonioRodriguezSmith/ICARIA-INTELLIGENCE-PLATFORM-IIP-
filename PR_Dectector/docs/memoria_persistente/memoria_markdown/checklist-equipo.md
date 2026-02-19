# Checklist Equipo (Detector)

[Volver a la memoria del agente ICARIA](./MEMORIA_AGENTE_ICARIA.md)

---

- [ ] Descargar e instalar los programas necesarios siguiendo la [Guía de Integración de Programas y Herramientas](./Guia_Integracion_Programas.md).
- [ ] Revisar `Detector/docs/MEMORIA_AGENTE_ICARIA.md`.
- [ ] Configurar `.env` desde `.env.sample`.
- [ ] Ejecutar `scripts/register_session.sh` para registrar la sesión.

---

**Herramientas recomendadas**

- [ ] **Swagger/OpenAPI**: Documentar y probar las APIs del MCP Server.
- [ ] **SonarQube**: Realizar análisis estático del código.
- [ ] **Grafana y Prometheus**: Monitorear el rendimiento del sistema.
- [ ] **Vault (HashiCorp)**: Gestionar credenciales y secretos.
- [ ] **Redis o RabbitMQ**: Implementar colas de mensajes o caché.
- [ ] **Elastic Stack (ELK)**: Centralizar y analizar logs.
- [ ] **Terraform o Pulumi**: Automatizar la provisión de infraestructura.
- [ ] **Nginx o Traefik**: Optimizar el balanceo de carga y enrutamiento.

---

**Pasos operativos recomendados para regenerar KPIs y validar reglas:**

- [ ] Validar/Corregir resumen JSON si fuera necesario:
	```powershell
	python Detector/scripts/fix_json_summary.py
	```
- [ ] Generar KPIs combinados:
	```powershell
	python Detector/scripts/generate_kpis_combined.py
	```
- [ ] Evaluar catálogo de reglas sobre el desglose de condiciones:
	```powershell
	python Detector/scripts/evaluate_rules.py
	```
- [ ] Comprobar salidas en `Detector/reglas/Kpis/` (`kpis_combined.*`, `condiciones_desglose.*`, `condiciones_with_rules.csv`).
