📌 Dervishi_Romina_Tracking_App_Capstone

A modern, Jira-inspired task and project management system built for my Capstone Project.
Designed with a focus on clean UX, professional UI, and robust backend structure.

🚀 Project Overview

Tracking App is a full-stack web application that helps users create, organize, and track projects and tasks.
The system includes:

User authentication (register & login)

Project creation with statuses (Pending, In-Progress, Completed)

Task management inside each project

Fully responsive, Jira-styled UI

Modern, professional design suitable for production use

This project is built as part of my Capstone Graduation Requirements.

🛠️ Tech Stack
Frontend

React.js

Axios

React Router

Custom Jira-style CSS (professional UI)

Backend

Node.js

Express.js

MongoDB (Mongoose)

JSON Web Token (JWT) authentication

BCrypt password hashing

Environment

.env file for secrets (JWT secret, database URI)

.env is ignored by Git according to security best practices

🌟 Features
🔐 Authentication

Secure login & registration

JWT-based auth

User roles & ownership rules

📁 Project Management

Create / Edit / Delete projects

Project status:

🟡 Pending

🔵 In Progress

🟢 Completed

Jira-style project cards

Status pills, hover effects, animations

✅ Task Management

Create tasks inside a project

Update task status

Display tasks on a Kanban board

Tasks categorized into:

To-Do

In Progress

Done

🎨 Jira-Styled UI

Soft grey background

Professional card UI

Subtle elevation & transitions

Colored borders for statuses

Fully responsive layout

📂 Project Structure
Dervishi_Romina_Tracking_App_Capstone
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── db.js
│   └── .env  (ignored)
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── context
│   │   ├── styles
│   │   │     └── jira.css
│   │   └── App.js
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/<your-username>/Dervishi_Romina_Tracking_App_Capstone.git
cd Dervishi_Romina_Tracking_App_Capstone

2. Backend setup
cd backend
npm install


Create a .env file:

MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
PORT=8080


Run the server:

npm start

3. Frontend setup
cd ../frontend
npm install
npm start


The frontend runs at:
👉 http://localhost:3000
The backend runs at:
👉 http://localhost:8080

🧪 Testing the App

Register a new account

Create your first project

Add tasks

Move tasks through the Kanban board

Update project status

Experience a polished Jira-like UI

🎓 Capstone Compliance

This project fulfills the capstone submission requirements:

✔ Correct folder naming:
Dervishi_Romina_Tracking_App_Capstone
✔ Includes backend + frontend
✔ Includes authentication
✔ Real-world CRUD operations
✔ Fully styled UI
✔ Professional README

📜 License

This project was developed as an academic capstone and is not licensed for distribution without permission.

🙋‍♀️ Author

Romina Dervishi
Tracking App — Capstone Project



