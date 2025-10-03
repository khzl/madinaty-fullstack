# 🏙️ Madinaty Full-Stack Project

Welcome to the **Madinaty Full-Stack Project**!  
This repository is a **monorepo** that contains both the **Backend (NestJS API)** and the **Frontend (React Application)**.

---

## 🚀 Getting Started

Before running the project, make sure you are inside the **correct directory** (`/frontend` or `/backend`) depending on which part you are working on.

### ✅ Prerequisites
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Git](https://git-scm.com/) installed on your system
- Code Editor (e.g., [VS Code](https://code.visualstudio.com/))

---

## 💻 Frontend (React)

The frontend application is built using **React** and is located in the `/frontend` directory.

### 📌 Responsibilities
- Building the **User Interface (UI)** and **User Experience (UX)**
- Implementing reusable components and application views
- Consuming API endpoints from the backend
- State management and client-side routing

### 🔧 Frontend Commands (must be run inside `/frontend`)
| Command         | Description                                      |
|-----------------|--------------------------------------------------|
| `cd frontend`   | Enter the React project directory                |
| `npm install`   | Install all dependencies                         |
| `npm start`     | Start the app in development mode (`http://localhost:3000`) |
| `npm run build` | Build the app for production deployment          |

---

## ⚙️ Backend (NestJS)

The backend is built using **NestJS** and is located in the `/backend` directory.

### 📌 Responsibilities
- Designing and implementing **RESTful API endpoints**
- Handling **database interactions** (models, migrations, queries)
- Implementing **business logic**
- Managing **authentication and authorization**
- Writing and maintaining **unit/e2e tests**

### 🔧 Backend Commands (must be run inside `/backend`)
| Command             | Description                                   |
|---------------------|-----------------------------------------------|
| `cd backend`        | Enter the NestJS project directory            |
| `npm install`       | Install all dependencies                      |
| `npm run start:dev` | Start the NestJS server in development (hot-reload) |
| `npm run start:prod`| Start the application in production mode      |
| `npm run test`      | Run unit and end-to-end tests                 |

---

## 🤝 Git Workflow (Team Collaboration)

To ensure smooth collaboration, **all team members must follow these steps** when pushing their changes.

### 🔧 Git Commands Summary
| Command                  | Description                                           |
|--------------------------|-------------------------------------------------------|
| `git status`             | Check modified and untracked files                    |
| `git add .`              | Stage all modified/new files for commit               |
| `git commit -m "Message"`| Commit changes with a clear descriptive message       |
| `git pull origin main`   | Pull the latest changes (avoid merge conflicts)       |
| `git push origin main`   | Push your local commits to the remote repository      |

### ✅ Best Practices
- Always run `git pull origin main` **before starting work** and **before pushing changes**
- Write **clear commit messages**, e.g.:  
  - `FE: Add Login component`  
  - `BE: Fix user authentication bug`
- Only modify files inside your respective directory (`/frontend` or `/backend`)

---

## 📂 Project Structure

madinaty/ # Main project folder
├── .git/ # Git configuration files
├── README.md # Project documentation
├── package.json # Global config (if needed)
│
├── backend/ # Backend (NestJS)
│ ├── src/ # Source code
│ ├── node_modules/ # Installed dependencies
│ ├── package.json # Backend dependencies
│ └── ...
│
└── frontend/ # Frontend (React)
├── src/ # Source code
├── node_modules/ # Installed dependencies
├── package.json # Frontend dependencies
└── ...


---

## 🌍 Deployment
- **Frontend (React):** Can be deployed on [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
- **Backend (NestJS):** Can be deployed on [Heroku](https://www.heroku.com/), [Render](https://render.com/), or any Node.js hosting service.

---

## 👥 Team Guidelines
- Respect code reviews and project conventions
- Ensure proper documentation of new features
- Test your code before pushing to avoid breaking builds

---

🚀 Happy Coding with **Madinaty Full-Stack Project**! 🎉