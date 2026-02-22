# SonarQube: Configuración local

## Instalación
1. Descarga SonarQube Community Edition desde https://www.sonarsource.com/products/sonarqube/downloads/
2. Descomprime el archivo y navega a la carpeta:
   ```bash
   cd sonarqube-<version>/bin/windows-x86-64/
   StartSonar.bat
   ```
3. Accede a http://localhost:9000 en tu navegador.

## Primer uso
1. Crea un proyecto y genera un token de usuario.
2. Instala el scanner CLI:
   ```bash
   pip install sonar-scanner
   ```
3. Ejecuta el análisis:
   ```bash
   sonar-scanner -Dsonar.projectKey=icaria-intelligence-platform -Dsonar.sources=. -Dsonar.host.url=http://localhost:9000 -Dsonar.login=<token>
   ```

## Recomendaciones
- Revisa los reportes en la interfaz web.
- Corrige los issues detectados.
- Documenta los resultados y comparte con el equipo.

---
// ...existing code...
