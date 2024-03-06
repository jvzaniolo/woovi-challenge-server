# To-do app GraphQL Server

This is a simple server that provides a GraphQL API to manage tasks for a To-do app.

## Technologies

The server is built using:

- Node.js
- Koa
- GraphQL
- Apollo Server
- MongoDB
- TypeScript
- Docker

## Getting Started

To run the server, you need to have Node.js and MongoDB installed on your machine.

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Run `docker compose up -d` to start the MongoDB container
4. Run `npm run dev` to start the server in development mode
5. Open your browser and go to `http://localhost:4000` to access the GraphQL Playground

## Requirements

- The user can create a new task
- The user can list all existing tasks
- The user can list an existing task by id
- The user can update an existing task by id
- The user can delete an existing task by id
