import http from 'node:http'
import { readFileSync } from 'node:fs'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { koaMiddleware } from '@as-integrations/koa'
import { gql } from 'graphql-tag'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { MongoClient } from 'mongodb'
import { Tasks } from './datasources/tasks'
import { resolvers } from './graphql/resolvers'

let client = new MongoClient('mongodb://root:example@localhost:27017')

client.connect()

let typeDefs = gql(
  readFileSync(new URL('./graphql/schema.graphql', import.meta.url), 'utf8')
)

let app = new Koa()
let httpServer = http.createServer(app.callback())

let server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

await server.start()

app.use(cors())
app.use(bodyParser())
app.use(
  koaMiddleware(server, {
    context: async ({ ctx }) => ({
      dataSources: {
        token: ctx.header.token,
        tasks: new Tasks({
          collection: client.db('test').collection('tasks'),
        }),
      },
    }),
  })
)

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

console.log(`🚀 Server ready at http://localhost:4000/`)
