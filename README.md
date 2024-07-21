# Node.js Backend Project for office dashboard

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

- Node.js (v12 or later)
- MongoDB instance (you can use MongoDB Atlas or a local MongoDB server)
