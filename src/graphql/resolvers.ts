export let resolvers = {
  Query: {
    tasks: async (parent, args, ctx) => {
      return ctx.dataSources.tasks.getTasks()
    },
    task: async (parent, args, ctx) => {
      return ctx.dataSources.tasks.getTask(args.id)
    },
  },
  Mutation: {
    createTask: async (parent, args, ctx) => {
      return ctx.dataSources.tasks.createTask(args)
    },
    updateTask: async (parent, args, ctx) => {
      return ctx.dataSources.tasks.updateTask(args)
    },
    deleteTask: async (parent, args, ctx) => {
      return ctx.dataSources.tasks.deleteTask(args.id)
    },
  },
}
