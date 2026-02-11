const { ObjectId } = require('mongodb');

class TaskRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(task) {
    await this.collection.insertOne(task);
    return task;
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async getById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, task) {
    task._id = new ObjectId(id);
    await this.collection.replaceOne({ _id: new ObjectId(id) }, task);
    return task;
  }

  async delete(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('not found');
    }
  }
}

module.exports = TaskRepository;
