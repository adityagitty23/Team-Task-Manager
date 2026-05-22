# Team Task Manager 🚀

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application for managing team projects, assigning tasks, tracking progress, and improving collaboration with role-based access control.

---

# 🌐 Live Demo

## Frontend

[Team Task Manager Live App](https://team-task-manager-three-beta.vercel.app)

## Backend API

[Backend API](https://team-task-manager-production-6835.up.railway.app/)

---

# Demo Id's 🆔 

# Admin
Email : admin@gmail.com
Password : admin1

# Member 
Email : member1@gmail.com
Password : member1

---

# 📂 GitHub Repository

Add your GitHub repository link here:

```txt
https://github.com/adityagitty23/Team-Task-Manager
```

---

# 🎥 Demo Video

Add your demo video link here:

```txt
https://drive.google.com/file/d/1gANdfFLeyxxPs34NY95FkEGQGd_mR3Gi/view?usp=sharing
```

---

# 📌 Project Overview

Team Task Manager is a collaborative project management platform where admins can create projects, assign tasks to team members, monitor task progress, and track overdue work efficiently.

The application supports role-based authentication, real-time team collaboration features, task notifications, and dashboard analytics.

---

# ✨ Features

## 🔐 Authentication & Authorization

* User Signup & Login
* JWT Authentication
* Role-Based Access Control (Admin / Member)

---

## 📁 Project Management

* Create Projects
* Update Project Status
* Delete Projects
* Leave Projects
* Add/Remove Members from Projects

---

## ✅ Task Management

* Create Tasks
* Assign Tasks to Members
* Update Task Status
* Overdue Task Tracking
* Task Completion Notifications

---

## 🔔 Notifications

* Task Assignment Notifications
* Task Completion Notifications
* Notification Badge Counter
* Mark Notifications as Read

---

## 📊 Dashboard

* Total Tasks
* Completed Tasks
* Pending Tasks
* In Progress Tasks
* Overdue Tasks

---

## 👥 Team Management

* View Team Members
* Member Profile Page
* Assigned Task Tracking

---

## 🎨 UI Features

* Modern Responsive UI
* Glassmorphism Design
* Mobile Responsive Layout
* Interactive Dashboard Cards

---

# 🛠️ Tech Stack

## Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Lucide React

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

---

## Deployment

* Frontend: [Vercel](https://team-task-manager-three-beta.vercel.app/)
* Backend: [Railway](https://team-task-manager-production-6835.up.railway.app/)
* Database: [MongoDB Atlas]

---

# 📁 Folder Structure

```txt
team-task-manager/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/adityagitty23/Team-Task-Manager.git
```

---

# 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

## Backend `.env`

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000
```

---

## Frontend `.env`

```env
VITE_API_URL=your_backend_api_url
```

---

# 📌 API Routes

## Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

---

## Projects

* GET `/api/projects`
* POST `/api/projects`
* PUT `/api/projects/:id/add-member`
* DELETE `/api/projects/:id`

---

## Tasks

* POST `/api/tasks`
* PUT `/api/tasks/:id`
* GET `/api/tasks/project/:projectId`

---

## Notifications

* GET `/api/notifications`
* PUT `/api/notifications/:id/read`

---

# 👨‍💻 Author

## Aditya Kumar

B.Tech Final Year Student
Full Stack MERN Developer

---

# 📄 License

This project is developed for educational and assignment purposes.
