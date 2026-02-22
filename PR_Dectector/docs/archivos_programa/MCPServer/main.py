import os
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Any
from dotenv import load_dotenv

# Cargar variables de entorno desde .env si existe
load_dotenv()

app = FastAPI(title="MCP Server API", description="API para el análisis y validación de casos Broker frente a condiciones ICARIA.")

class Caso(BaseModel):
    id: str
    descripcion: str
    condiciones: List[str]

class Condicion(BaseModel):
    codigo: str
    nombre: str
    dominio: str
    descripcion: str
    keywords: List[str]
    pattern: str

class AnalisisRequest(BaseModel):
    casos: List[Any]
    condiciones: List[Any]

@app.get("/status")
def status():
    return {
        "status": "MCP Server activo",
        "api_key": os.getenv("MCP_API_KEY", "no definida"),
        "user": os.getenv("USER", "no definido")
    }

@app.post("/analizar")
def analizar(req: AnalisisRequest):
    # Aquí iría la lógica real de matching
    return {
        "resumen": "Análisis simulado. Implementa la lógica real aquí.",
        "detalles": []
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
