# Node.js Backend Project for TODO dashboard

This is a Node.js backend project that provides an API for user authentication and task management using MongoDB. The application includes user signup and login functionality with JWT-based authentication and supports task creation with recurrence and deadline features.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Cron Jobs](#cron-jobs)
- [License](#license)

## Features

- User signup with validation
- User login with JWT authentication
- Task management (create, read, update, delete)
- Recurring tasks with daily, weekly, and monthly schedules
- Automated task status updates using cron jobs

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- node-cron for scheduling tasks

## Getting Started

### Prerequisites
Ensure you have the following installed on your local development machine:

Node.js (v20 or higher recommended)
npm (v6 or higher recommended)
MongoDB (local or a MongoDB Atlas account)

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install dependencies:

bash
Copy code
npm install

