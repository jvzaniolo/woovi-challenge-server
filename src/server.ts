import { readFileSync } from 'node:fs'
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { ApolloServer } from '@apollo/server'
import { koaMiddleware } from '@as-integrations/koa'
import { resolvers } from './resolvers'
import { Tasks } from './datasources/tasks'
import { db } from './db/connection'

let typeDefs = readFileSync(new URL('./schema.graphql', import.meta.url), {
  encoding: 'utf-8',
})

let app = new Koa()

let server = new ApolloServer({
  typeDefs,
  resolvers,
})

await server.start()

app.use(cors())
app.use(bodyParser())
app.use(
  koaMiddleware(server, {
    context: async () => ({
      dataSources: {
        tasks: new Tasks({
          collection: db.collection('tasks'),
        }),
      },
    }),
  })
)

app.listen(4000, () => {
  console.log(`🚀 Server ready at http://localhost:4000/`)
})
