# Myrsa - Employee Management System

A full-stack employee management system using Angular (Frontend) and Express + TypeScript + MySQL (Backend).

---

#  Backend Setup

1. Initialize project:

```bash
mkdir task && cd task
npm init -y
npm install express mysql2 cors
npm install --save-dev typescript ts-node @types/node @types/express @types/cors
npx tsc --init

2. Update tsconfig.json:
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}

3. Project structure:

src/
  config/         # DB connection
  controllers/    # Logic
  models/         # Data types
  routes/         # API endpoints
  services/       # DB operations
  app.ts
  server.ts       # Starts server on port 8080

4. Scripts in package.json:

"scripts": {
  "dev": "ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

5. Run server:

npx ts-node src/server.ts

 # Frontend Setup

1. Create app:

ng new employee_app
cd employee_app
npm install bootstrap@4 --save
npm install @angular/forms

2. Update angular.json:

"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]

3.Run app:
ng serve

4. Features
Add/View/Edit/Delete employees

Count employees by position

Responsive modern UI with dark theme (gray + orange)

Angular + Bootstrap styling

5. Tech Stack
Frontend: Angular, Bootstrap

Backend: Node.js, Express, TypeScript

Database: MySQL
Backend: http://localhost:8080
Frontend: http://localhost:4200

# MYSQL Database creation
CREATE DATABASE IF NOT EXISTS employees_db;

USE employees_db;

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  position VARCHAR(100) NOT NULL
);

select * from employees;
ALTER TABLE employees ADD CONSTRAINT unique_email UNIQUE (email);





