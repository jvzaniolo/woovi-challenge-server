import { ObjectId, type Collection } from 'mongodb'

export class Tasks {
  private collection: Collection

  constructor({ collection }) {
    this.collection = collection
  }

  async getTasks() {
    return await this.collection.find().toArray()
  }

  async getTask(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) })
  }

  async createTask({ title, description }) {
    let insert = await this.collection.insertOne({
      title,
      description,
      completed: false,
    })
    if (insert.acknowledged) {
      return { id: insert.insertedId, title, description, completed: false }
    }
    return null
  }

  async updateTask({ id, title, description, completed }) {
    let query = { _id: new ObjectId(id) }
    let update = await this.collection.updateOne(query, {
      $set: { title, description, completed },
    })
    if (update.acknowledged) {
      return await this.collection.findOne(query)
    }
    return null
  }

  async deleteTask(id: string) {
    let query = { _id: new ObjectId(id) }
    let destroy = await this.collection.deleteOne(query)
    return destroy.acknowledged && destroy.deletedCount === 1 ? true : false
  }
}
