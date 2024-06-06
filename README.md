# Task Manager

A simple task manager application built with Node.js, Express, and MongoDB. This application allows users to create, view, update, and delete tasks.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Middleware](#middleware)
- [Seed Data](#seed-data)
- [Personal Decisions](#personal-decisions)
- [Code structure](#code-structure)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AAYUSHSHAH20/Task-Manager.git

2. Navigate into the project directory:

   ```bash
   cd Task-Manager

3. Install the dependencies:

   ```bash
   npm install
4. Start server:

   ```bash
   npm start
5. Database Connection:
   ```bash
   mongodb://localhost:27017/mydatabase
connect to the MongoDB database using above given String.   
## Configuration

The .env file is added in the config so no need to change it.

## API Endpoints

### Create a Task

- **URL**: `/TaskManager`
- **Method**: `POST`
- **Description**: Create a new task.
- **Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "category": "Task Category",
    "dueDate": "2023-06-10" // Optional, defaults to current date
  }

### Get All Task

- **URL**: `/TaskManager`
- **Method**: `GET`
- **Description**: Get all the task.

### Edit a Task

- **URL**: `/TaskManager/:id`
- **Method**: `PUT`
- **Description**: Edit a task.
- **Body**:
  ```json
  {
    "title": "Task Title", // Can change any field
  }

### Delete a Task

- **URL**: `/TaskManager/:id`
- **Method**: `DELETE`
- **Description**: Delete a task.

### Toggle a Task to compelete

- **URL**: `/TaskManager/:id/toggle`
- **Method**: `PUT`
- **Description**: Toggle the completion status of a task..
- **Response**: If the task is already completed, returns an error.

### Send Email reminder of incompelete task

- **URL**: `/TaskManager/check-due-dates`
- **Method**: `GET`
- **Description**: Send an email reminder if the task's due date has passed.Used Mail Trapper to check the email.

## Error Handling

Errors are handled using a custom ErrorResponse class. If a task creation fails due to a validation error, or any other server error, appropriate error messages are returned with the relevant HTTP status codes.

## Middleware

- **asyncHandler**: Handles asynchronous operations in controllers.
- **errorHandler**: Global error handling middleware.
- **express-mongo-sanitize**: Prevents MongoDB Operator Injection.
- **cookie-parser**: Parses cookies.
- **advanceResults**: Middleware for advanced filtering, sorting, and pagination of results.

## Seed Data

To seed the database with dummy data, you can use the provided seeder script.

1. Add the dummy data:

   ```bash
   node seeder -i
2. To remove the data:

      ```bash
   node seeder -d
## Personal Decisions
- Decided to separate the code as per below structure instead of write in one file.
- Added the advance search features and pagination.
- Added the mail functionality to check the task.

## Code Structure

The project structure is organized as follows:

```plaintext
Task-Manager/
│
├── config/                 # Configuration files
│  ├──config.env           # Contians variables to connect to database   
   └── db.js               # Database connection setup
│
├── controllers/            # Controller functions
│   └── TaskManager.js      # Task management logic
│
├── middleware/             # Custom middleware
│   ├── advanceResults.js   # Middleware for advanced filtering and pagination
│   ├── asyncHandler.js     # Middleware for handling async functions
│   └── errorHandler.js     # Global error handling middleware
│
├── models/                 # Mongoose models
│   └── Task.js             # Task model schema
│
├── routes/                 # Route definitions
│   └── TaskManager.js      # Routes for task management
│
├── utils/                  # Utility functions
|   ├── errorresponse.js    # Utility for sending error Response back
│   └── sendEmail.js        # Utility for sending emails
│
├── package.json            # NPM dependencies and scripts
├── README.md               # Project documentation
├── server.js               # Entry point for the application
└── seeder.js               # Script for seeding the database
