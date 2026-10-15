# Pet Care Veterinary Management System

## 1. Project Overview

The Pet Care Veterinary Management System is a web application
developed to manage pet owners, pets, treatments, appointments,
vaccinations, medical history reports and payment records.

## 2. Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery and AJAX
- Node.js
- Express.js
- MySQL
- bcrypt
- express-session

## 3. Main Features

- Pet owner management
- Pet management
- Treatment management
- Appointment management
- Vaccination management
- Admin login and logout
- Password hashing
- Protected API routes
- Pet medical history reports
- Dashboard statistics
- Payment record management
- Search and filter
- Responsive user interface

## 4. Project Requirements

Install Node.js and MySQL before running the application.

## 5. Database Setup

Create a MySQL database named:

pet_care_veterinary

Create the required tables:
owners, pets, treatments, appointments, users,
vaccinations and payments.

## 6. Database Configuration

Open config/db.js and configure the MySQL host,
username, password and database name.

Do not publish database passwords or session secrets.

## 7. Install Dependencies

Open the terminal in the project folder and run:

npm install

## 8. Start the Application

Run:

node server.js

Open the application in your browser:

http://localhost:3000

## 9. Admin Login

Open:

http://localhost:3000/login.html

Use the administrator account created during setup.

## 10. Medical History Report

Open:

http://localhost:3000/medical-report.html

Log in first, then enter a valid Pet ID to generate
the medical history report.

## 11. Payment Workflow

The payment module stores payment records and allows
administrators to manage payment methods and statuses.

It is a simulated workflow and does not process real
card payments or transfer money.

## 12. Security

- Passwords are hashed using bcrypt.
- Parameterized SQL queries are used in database models.
- Session-based authentication protects selected API routes.
- Client-side and server-side input validation are applied.

## 13. Project Status

The application should be tested before submission.