📌 Dervishi_Romina_Tracking_App_Capstone

A modern, Jira-inspired task and project management system built for my Capstone Project.
Designed with a clean UX, professional UI, and a well-structured full-stack architecture.

🚀 Project Overview

Tracking App is a full-stack web application that allows users to create, organize, and track projects and tasks.

It includes:

🔐 User authentication (register & login)

📁 Project creation with statuses (Pending, In-Progress, Completed)

📝 Task management inside each project

🎨 Jira-inspired UI with responsive design

✔ Real-world CRUD operations

📊 Kanban-style task workflow

This project was built as part of my Capstone Graduation Requirements.

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

JWT Authentication

BCrypt password hashing

Environment

.env file for secrets

.env is ignored in Git for security best practices

🌟 Features
🔐 Authentication

Secure login and registration

JWT-based protection

Owner-specific project access

📁 Project Management

Create / Edit / Delete projects

Project statuses:

🟡 Pending

🔵 In Progress

🟢 Completed

Status pills and animated cards

Professional, Jira-like UI

✅ Task Management

Create tasks inside a project

Update task statuses

Task statuses appear in a Kanban board

Columns include:

To-Do

In Progress

Done

🎨 Jira-Styled UI

Modern grey shell layout

Clean project and task cards

Colored borders for status

Responsive design

Smooth transitions & shadows

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
│   │   ├── styles.css
│   │   └── App.js
│   └── package.json
│
└── README.md


📥 Clone the Repository

To download and run this project locally, use:

git clone https://github.com/RominaDervishi/Dervishi_Romina_Tracking_App_Capstone.git
Then enter the folder:

cd Dervishi_Romina_Tracking_App_Capstone

⚙️ Installation & Setup

1. Backend Setup

cd backend
npm install

Create a .env file:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=8080

Run server:
npm start

2. Frontend Setup
cd ../frontend
npm install
npm start

Frontend runs at:
👉 http://localhost:3000

Backend runs at:
👉 http://localhost:8080

🧪 Testing the App

Register a new account

Create your first project

Add tasks

Use the Kanban board

Change project status

Enjoy a smooth Jira-like experience

🎓 Capstone Compliance
This project fulfills all capstone requirements:

✔ Correct folder structure
✔ Backend + Frontend
✔ Authentication
✔ CRUD operations
✔ Styled UI
✔ Professional README

📜 License
This project was developed as an academic capstone and is not intended for redistribution without permission.

🙋‍♀️ Author

Romina Dervishi
Tracking App — Capstone Project