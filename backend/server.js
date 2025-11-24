// backend/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: "Aprender React + Node", done: false },
  { id: 2, text: "Configurar Vite", done: false }
];
let nextId = 3;

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Texto requerido" });
  const todo = { id: nextId++, text, done: false };
  todos.unshift(todo);
  res.status(201).json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));

// backend: lógica conceptual (ES Modules)
app.patch("/api/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  // 1) Buscar
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: "No existe tarea" });

  // 2) Validar / aplicar cambios parciales
  // Por ejemplo permitimos cambiar 'done' y 'text'
  const { done, text } = req.body;
  if (typeof done !== "undefined") {
    if (typeof done !== "boolean") {
      return res.status(400).json({ error: "'done' debe ser booleano" });
    }
    todo.done = done;
  }
  if (typeof text === "string") {
    todo.text = text.trim();
  }

  // 3) Responder con la tarea actualizada
  res.json(todo);
});
