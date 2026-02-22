# Integración de Redis en ICARIA

## Descripción
Redis se utiliza como servicio de caché y colas simples, ideal para microservicios y pruebas rápidas.

## Configuración en Docker Compose
El servicio Redis está definido en el archivo `docker-compose.yml`:

```yaml
redis:
  image: redis:latest
  container_name: redis
  ports:
    - "6379:6379"
  restart: unless-stopped
```

## Uso básico
- Puedes conectar tu microservicio MCP Server a Redis usando la librería `redis-py` en Python.
- Ejemplo de conexión:

```python
import redis
r = redis.Redis(host='redis', port=6379)
r.set('clave', 'valor')
print(r.get('clave'))
```

## Recomendaciones
- Usa Redis para caché, pub/sub y colas simples.
- Para colas avanzadas o procesamiento asíncrono, considera RabbitMQ.
- Documenta los flujos de integración y comparte con el equipo.

---
// ...existing code...
