<h1 align="center" id="title">Node.js Backend Project for TODO dashboard</h1>

<p id="description">This is a Node.js backend project that provides an API for user authentication and task management using MongoDB. The application includes user signup and login functionality with JWT-based authentication and supports task creation with recurrence and deadline features.</p>

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Cron Jobs](#cron-jobs)
- [License](#license)
  
<h2>🧐 Features</h2>

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
