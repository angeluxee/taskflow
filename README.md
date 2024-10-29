# TaskFlow
> ⚠ **Nota:** La aplicación está en desarrollo y puede contener errores.

## Descripción del Proyecto
Este proyecto es una aplicación estilo **Trello** simplificada, desarrollada utilizando **Flask** para el backend, **React** para el frontend, **JWT** para la autenticación y **MongoDB** para el almacenamiento de datos. Permite a los usuarios registrarse, crear y gestionar tableros con listas y tareas, ofreciendo una experiencia de organización visual similar a Trello.

## Características
- Registro de usuarios y autenticación con **JWT**.
- Creación de tableros con listas de tareas.
- Gestión de tareas dentro de las listas (añadir, editar, eliminar).
- Almacenamiento de los datos en **MongoDB**.
- Rutas protegidas para asegurar que solo usuarios autenticados puedan acceder a sus tableros.
  
## Tecnologías Utilizadas
- **Frontend**: React 
- **Backend**: Flask 
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Estilos**: Tailwind CSS

## Requisitos del Sistema
- **Python 3.8+**
- **Node.js 14+**
- **MongoDB** 
- **NPM** o **Yarn** 

## Instalación y Configuración

### 1. Clona el repositorio:

```bash
git clone https://gitlab.com/devluxe/taskflow.git
cd taskflow
```

### 2. Backend:

```bash
cd backend
```
- Crea un entorno virtual y activarlo:

  ```bash
  python -m venv venv
  source venv/bin/activate # Para Linux o Mac
  venv\Scripts\activate # Para Windows
  ```

- Instala dependencias:

  ```bash
  pip install -r requirements.txt
  ```

- Crea un archivo `.env` en el directorio `backend` y configura las variables necesarias (URL de la base de datos MongoDB y la clave secreta para JWT):

  ```bash
  MONGO_URI=mongodb://localhost/taskflow  
  JWT_SECRET_KEY=tu_clave_secreta
  FRONT_URL=http://localhost:3000 
  ```

- Ejecuta el servidor Flask:

  ```bash
  python src/app.py
  ```

### 3. Frontend:

```bash
cd frontend
```

- Instala dependencias:

  ```bash
  npm install
  ```

- Crea o edita el archivo '.env' en el directorio '/src/' y definir la url del backend:

  ```bash
  REACT_APP_API=http://localhost:5000
  ```

- Ejecuta el servidor React:

  ```bash
  npm start
  ```
   