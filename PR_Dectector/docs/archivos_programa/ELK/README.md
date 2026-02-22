# ELK Stack (Elasticsearch, Logstash, Kibana)

ELK es la solución estándar para gestión y visualización de logs.

## Servicios
 - Elasticsearch: indexa y almacena logs (puertos 9200, 9300)
 - Logstash: ingesta y transformación de datos (puerto 5000)
 - Kibana: visualización de logs (puerto 5601)

## Ejemplo de conexión en Python
```python
from elasticsearch import Elasticsearch
es = Elasticsearch('http://localhost:9200')
print(es.info())
```

## Recomendaciones
- Definir pipelines en Logstash para ingesta personalizada (ver logstash.conf).
- Usar Kibana para dashboards y alertas.

## Ejemplo de ingesta de logs vía Logstash
Envia un log JSON por TCP:
```python
import socket, json
s = socket.socket()
s.connect(('localhost', 5000))
log = {"mensaje": "Log de prueba", "nivel": "INFO"}
s.send((json.dumps(log)+"\n").encode())
s.close()
```

## Ejemplo de conexión a Elasticsearch
```python
from elasticsearch import Elasticsearch
es = Elasticsearch('http://localhost:9200')
print(es.info())
```
