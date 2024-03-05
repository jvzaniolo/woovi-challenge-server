import { ObjectId, type Collection } from 'mongodb'

type TaskDocument = {
  _id: ObjectId
  title: string
  description?: string
  completed: boolean
}

export class Tasks {
  private collection: Collection<TaskDocument>

  constructor({ collection }) {
    this.collection = collection
  }

  async getTasks() {
    return await this.collection.find().toArray()
  }

  async getTask(id: string) {
    let _id = new ObjectId(id)
    return await this.collection.findOne({ _id })
  }

  async createTask(input: { title: string; description?: string }) {
    let { title, description } = input
    try {
      let task = {
        _id: new ObjectId(),
        title,
        description,
        completed: false,
      }
      await this.collection.insertOne(task)
      return {
        code: 200,
        success: true,
        task,
      }
    } catch {
      return {
        code: 500,
        success: false,
        task: null,
      }
    }
  }

  async updateTask({
    input,
  }: {
    input: {
      id: string
      title?: string
      description?: string
      completed?: boolean
    }
  }) {
    try {
      let _id = new ObjectId(input.id)
      let task = await this.collection.findOne({ _id })

      if (!task) {
        return {
          code: 404,
          success: false,
          task: null,
        }
      }

      let updatedTaskBody = {
        title: input.title || task.title,
        description: input.description || task.description,
        completed: input.completed || task.completed,
      }

      await this.collection.updateOne(
        { _id },
        {
          $set: updatedTaskBody,
        }
      )

      return {
        code: 200,
        success: true,
        task: { _id, ...updatedTaskBody },
      }
    } catch {
      return {
        code: 500,
        success: false,
        task: null,
      }
    }
  }

  async deleteTask(id: string) {
    try {
      let _id = new ObjectId(id)
      await this.collection.deleteOne({ _id })
      return {
        code: 200,
        success: true,
        task: null,
      }
    } catch {
      return {
        code: 500,
        success: false,
        task: null,
      }
    }
  }
}
