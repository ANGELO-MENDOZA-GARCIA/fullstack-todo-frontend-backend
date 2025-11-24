import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/todos"); // proxy en vite.config.js
      if (!res.ok) throw new Error("Error al cargar tareas");
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: t }),
      });
      if (!res.ok) throw new Error("No se pudo crear la tarea");
      const created = await res.json();
      setTodos(prev => [created, ...prev]);
      setText("");
    } catch (err) {
      alert(err.message);
    }
  }

  async function remove(id) {
    if (!confirm("Borrar tarea?")) return;
    try {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      if (res.status !== 204 && !res.ok) throw new Error("No se pudo borrar");
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="wrap">
      <h1>To-Do Fullstack (React + Node)</h1>

      <section className="card">
        <form onSubmit={add}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nueva tarea..."
            aria-label="Nueva tarea"
          />
          <button>Añadir</button>
        </form>

        {loading && <p>Cargando tareas...</p>}
        {error && <p className="error">{error}</p>}

        <ul>
          {todos.length === 0 && !loading && <li>No hay tareas aún</li>}
          {todos.map(t => (
            <li key={t.id}>
              <span className={t.done ? "done" : ""}>{t.text}</span>
              <div className="actions">
                <button onClick={() => toggleDoneOptimistic(t.id)}>
                  {t.done ? "Desmarcar" : "Marcar"}
                </button>
                <button onClick={() => remove(t.id)}>Borrar</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

// frontend: manejo optimistic
async function toggleDoneOptimistic(id) {
  const prevTodos = todos;
  // 1) aplicar cambio localmente
  setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  // 2) enviar al servidor
  try {
    const todo = prevTodos.find(t => t.id === id);
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done })
    });
    if (!res.ok) throw new Error("Fallo al actualizar en servidor");
    // opcional: leer respuesta y reconciliar
    const updated = await res.json();
    setTodos(prev => prev.map(t => t.id === id ? updated : t));
  } catch (err) {
    // 3) rollback si falla
    setTodos(prevTodos);
    alert(err.message);
  }
}


}
