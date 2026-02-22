# Autenticación segura en Git y GitHub

## 1. Token Personal de Acceso (PAT)

### Generar un token en GitHub
1. Ve a [Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).
2. Haz clic en "Generate new token".
3. Elige los permisos mínimos necesarios (repo, workflow, etc.).
4. Copia el token generado y guárdalo en un lugar seguro.

### Configurar Git para usar el token
- Cuando hagas `git push` o `git pull` y se solicite usuario/contraseña:
  - Usa tu usuario de GitHub como usuario.
  - Usa el token como contraseña.
- Puedes guardar el token usando un helper de credenciales:
  ```bash
  git config --global credential.helper manager-core
  ```

## 2. Claves SSH

### Generar una clave SSH
```bash
ssh-keygen -t ed25519 -C "tu.email@dominio.com"
```
- Presiona Enter para aceptar la ruta por defecto y pon una passphrase segura.

### Añadir la clave pública a GitHub
1. Copia el contenido de `~/.ssh/id_ed25519.pub`.
2. Ve a [Settings > SSH and GPG keys](https://github.com/settings/keys).
3. Haz clic en "New SSH key" y pega la clave.

### Configurar Git para usar SSH
- Usa la URL SSH del repo:
  ```bash
  git remote set-url origin git@github.com:AntonioRodriguezSmith/ICARIA-INTELLIGENCE-PLATFORM-IIP-.git
  ```

## 3. Recomendaciones
- Nunca compartas tu token ni tu clave privada.
- Usa siempre HTTPS o SSH, nunca usuario/contraseña simple.
- Revoca tokens antiguos o no utilizados desde tu perfil de GitHub.

---

Para más detalles, consulta la [documentación oficial de GitHub](https://docs.github.com/es/authentication/).
