import { ObjectId, type Collection } from 'mongodb'
import type {
  Task,
  MutationCreateTaskArgs,
  MutationUpdateTaskArgs,
} from '../@types/types'

export class Tasks {
  private collection: Collection<Task>

  constructor({ collection }) {
    this.collection = collection
  }

  async getTasks() {
    return await this.collection.find().toArray()
  }

  async getTask(id: Task['_id']) {
    return await this.collection.findOne({ _id: id })
  }

  async createTask({ title, description }: MutationCreateTaskArgs) {
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
  }

  async updateTask({ input }: MutationUpdateTaskArgs) {
    let _id = new ObjectId(input.id) as Task['_id']
    let task = await this.collection.findOne({ _id })

    if (!task)
      return {
        code: 404,
        success: false,
        task: null,
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
      task: { _id: input.id, ...updatedTaskBody },
    }
  }

  async deleteTask(id: string) {
    let _id = new ObjectId(id) as Task['_id']
    await this.collection.deleteOne({ _id })
    return {
      code: 200,
      success: true,
      task: null,
    }
  }
}
