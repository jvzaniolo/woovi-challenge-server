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

## Considerations

I was not able to implement this server using the codegen to generate the types for the resolvers.

The code generation works as expected, but since the type for `ID` is different in MongoDB, the generated types are not compatible with the types used in the resolvers.

To run the codegen, you can use `npm run codegen` and it will generate the types in the `src/@types/types.ts` file.
