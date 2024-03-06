export let resolvers = {
  Task: {
    id: (parent) => parent.id ?? parent._id,
  },

  Query: {
    tasks: async (_, __, ctx) => {
      return ctx.dataSources.tasks.getTasks()
    },
    task: async (_, args, ctx) => {
      return ctx.dataSources.tasks.getTask(args.id)
    },
  },

  Mutation: {
    createTask: async (_, args, ctx) => {
      return ctx.dataSources.tasks.createTask(args)
    },
    updateTask: async (_, args, ctx) => {
      return ctx.dataSources.tasks.updateTask(args)
    },
    deleteTask: async (_, args, ctx) => {
      return ctx.dataSources.tasks.deleteTask(args.id)
    },
  },
}
