Buyer Management System

A full-stack web application that allows users to:

Register and Login using JWT authentication

Upload buyer data via CSV/Excel

View uploaded buyer data with pagination and search

Securely manage buyer invoice records

🚀 Tech Stack
🔹 Frontend

React (Vite)

React Router

Axios

Bootstrap

🔹 Backend

Node.js

Express.js

MySQL (Railway Cloud MySQL)

JWT Authentication

Bcrypt (Password Hashing)

Multer (File Upload)

XLSX (Excel Parsing)

🔹 Database

MySQL (Cloud hosted on Railway)

⚙️ Backend Setup
1️⃣ Navigate to backend
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
PORT=5000

# Railway Cloud DB
MYSQL_PUBLIC_URL=your_railway_public_mysql_url

JWT_SECRET=your_secret_key

4️⃣ Initialize Database

5️⃣ Start Backend Server
node app.js

Server runs on:

http://localhost:5000

🎨 Frontend Setup
1️⃣ Navigate to frontend
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


Frontend runs on:

http://localhost:5173

🔐 Authentication

JWT based authentication

Token expiry: 10 minutes

Protected routes via middleware

Auto logout on token expiration

📤 File Upload

Accepted formats:

.csv

.xls

.xlsx

Max file size: 5MB

Required CSV Columns:

Name
Email
Mobile
Address
Total Invoice Amount
Total Amount Paid
Total Amount Due

🔎 Features

User Registration (Unique Email & Mobile)

Password hashing with bcrypt

Login using Email or Mobile

JWT protected APIs

CSV/Excel file upload

Buyer data storage

Pagination

Search by Name, Email, or Mobile

Responsive UI

Cloud MySQL integration

🌍 Deployment Architecture
Frontend (Vercel)
        ↓
Backend API (Render / Railway)
        ↓
Railway Cloud MySQL

🛡 Security Practices

Hashed passwords

Parameterized SQL queries

JWT validation middleware

File type validation

File size validation

No sensitive data committed to GitHub

📌 Environment Variables
Backend .env
PORT=5000
MYSQL_PUBLIC_URL=your_mysql_public_url
JWT_SECRET=your_secret