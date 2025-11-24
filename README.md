# Fullstack Todo App

Este proyecto es una aplicación de lista de tareas (To-Do List) Fullstack.
El repositorio contiene tanto el cliente (Frontend) como el servidor (Backend).

## 📂 Estructura del Proyecto

* **frontend/**: Aplicación React creada con Vite.
* **backend/**: Servidor API REST con Node.js y Express.

## 🚀 Guía de Inicio Rápido

Para continuar el desarrollo en una nueva máquina, sigue estos pasos.

### 1. Prerrequisitos
* Node.js instalado.
* Git instalado.

### 2. Instalación (Hidratación)
Este proyecto requiere instalar las dependencias por separado para el frontend y el backend.

* 1. Instalar dependencias del Backend
```bash
cd backend
npm install
```

* 2. Instalar dependencias del Frontend
```bash
cd ../frontend
npm install
```

* 3. Ejecución (Encender Motores)

Necesitas dos terminales abiertas simultáneamente.

Terminal 1: Backend
```bash
cd backend
npm run dev
```
El servidor correrá usualmente en http://localhost:? (puerto definido en server.js)
Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
Vite te mostrará la URL local (ej. http://localhost:5173)
### 🛠 Tecnologías
Frontend: React, Vite, ESLint.

Backend: Node.js, Nodemon.
