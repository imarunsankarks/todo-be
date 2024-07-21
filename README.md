<h1 align="center" id="title">Node.js Backend Project for TODO dashboard</h1>

<p id="description">This is a Node.js backend project that provides an API for user authentication and task management using MongoDB. The application includes user signup and login functionality with JWT-based authentication and supports task creation with recurrence and deadline features.</p>

## Table of Contents

- [Features](#-features)
- [Technologies Used](#technologies-used)
- [Installation Steps](#%EF%B8%8F-installation-steps)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Cron Jobs](#cron-jobs)
- [Testing]
  
## <h2>🧐 Features</h2>

Here're some of the project's best features:

*   User signup with validation
*   User login with JWT authentication
*   Task management (create read update delete)
*   Recurring tasks with daily weekly and monthly schedules
*   Automated task status updates using cron jobs

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository:</p>

```
git clone https://github.com/imarunsankarks/todo-be.git
```

<p>2. Navigate to the project directory:</p>

```
cd todo-be
```

<p>3. Install the dependencies:</p>

```
npm install
```

<p>4. Start the server:</p>

```
node server.js
```

<p>5. Auto reloading</p>

```
npm run dev
```

<p>6. Testing</p>

```
npm run test
```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- node-cron for scheduling tasks

## Configuration
This project uses environment variables for configuration. Create a .env file in the root directory and add your configurations:
```
PORT=your_port
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```

## 🕒 Scheduling Tasks with Cron
In this project, I used cron for scheduling tasks with different recurrence patterns:
- Daily Tasks: Run every day at 9:30 AM
- Weekly Tasks: Run every Sunday at 9:30 AM
- Monthly Tasks: Run on the 1st day of every month at 9:30 AM

## 🧪 Unit Testing
Unit tests ensure that individual parts of the application work as expected. For the task controller and user controller, I used Mocha and Chai for unit testing.

We use Sinon for stubbing dependencies and Chai for assertions. Each test case checks the expected output and error handling, ensuring robust and reliable code.


