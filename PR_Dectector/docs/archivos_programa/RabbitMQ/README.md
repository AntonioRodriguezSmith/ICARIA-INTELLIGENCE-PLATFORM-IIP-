# RabbitMQ

RabbitMQ es un broker de mensajería ideal para colas avanzadas en arquitecturas microservicio.

## Credenciales de acceso
- Usuario: Antonio
- Contraseña: Loopit$01
- Puerto estándar: 5672
- Interfaz web: 15672

## Ejemplo de conexión en Python
```python
import pika
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', 5672, '/', pika.PlainCredentials('Antonio', 'Loopit$01')))
channel = connection.channel()
channel.queue_declare(queue='test')
channel.basic_publish(exchange='', routing_key='test', body='Hola RabbitMQ!')
connection.close()
```

## Recomendaciones
- Usar colas para desacoplar servicios.
- Configurar usuarios y permisos para producción.
