🏙️ Madinaty Full-Stack Project

Welcome to the Madinaty project repository! This is a monorepo containing both the NestJS API (Backend) and the React Application (Frontend).

🚀 Getting Started
To set up the project locally, you need to navigate to the correct directory before running any environment-specific commands.

Prerequisites
Node.js (LTS version recommended)

Git installed on your system

💻 1. Frontend (React)
The frontend application is built using React and resides in the /frontend directory.

Responsibilities
The Frontend team is responsible for:

Building the User Interface (UI) and User Experience (UX).

Implementing application components and views.

Consuming the API endpoints provided by the Backend team.

State management and client-side routing.

Frontend Commands
All frontend development and setup must be run inside the /frontend directory.

Command	Description
cd frontend	Mandatory first step to enter the React project.
npm install	Installs all necessary dependencies (once, or after package updates).
npm start	Runs the app in development mode (usually on http://localhost:3000).
npm run build	Builds the app for production deployment.


⚙️ 2. Backend (NestJS)
The backend API is built using NestJS (Node.js framework) and resides in the /backend directory.

Responsibilities
The Backend team is responsible for:

Designing and implementing the RESTful API endpoints.

Handling Database interactions (models, migrations).

Implementing Business Logic and core application features.

Managing Authentication and Authorization.

Backend Commands
All backend development and setup must be run inside the /backend directory.

Command	Description	
cd backend	Mandatory first step to enter the NestJS project.	
npm install	Installs all necessary dependencies.	
npm run start:dev	Starts the NestJS server in watch mode (reloads on file changes).	
npm run start:prod	Starts the application for production deployment.	
npm run test	Runs the unit and e2e tests.	


🤝 3. Git Workflow (Pushing Changes)
All team members must follow these steps to commit and push their work to the main repository using Git Bash or any terminal.

Git Commands Summary
Command	Description
git status	Shows which files have been modified.
git add .	Stages all modified and new files for the next commit.
git commit -m "Your descriptive message"	Creates a new commit with a message summarizing your changes.
git pull origin main	IMPORTANT: Pulls the latest changes from the remote repository before pushing (to avoid conflicts).
git push origin main	Pushes your local commits to the remote repository.


Best Practice
Always run git pull origin main before starting work and before git push.

Your commit messages (-m) should be clear, concise, and explain what you did (e.g., "FE: Add Login component", "BE: Fix user authentication bug").

Ensure you are working only within your respective directory (/frontend or /backend).

------------------------------------------------------------------

File Structure For Full Stack Project

madinaty/  <-- (main folder for repo)
├── .git/
├── README.md
├── package.json 
├── backend/
│   ├── src/
│   ├── node_modules/
│   ├── package.json  <-- For BackEnd
│   └── ...
└── frontend/ 
    ├── src/
    ├── node_modules/
    ├── package.json  <-- For FrontEnd
    └── ...

----------------------------------------------------------------

