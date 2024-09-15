from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uuid

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Montar a pasta static para servir arquivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Modelo de Tarefa
class Task(BaseModel):
    id: str
    text: str

# Lista de tarefas em memória
tasks = []

@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/tasks")
async def get_tasks():
    return tasks

@app.post("/api/tasks")
async def add_task(task: Task):
    tasks.append(task)
    return {"message": "Tarefa adicionada com sucesso!"}

@app.delete("/api/tasks/{task_id}")
async def delete_task(task_id: str):
    global tasks
    tasks = [task for task in tasks if task.id != task_id]
    return {"message": "Tarefa removida com sucesso!"}
