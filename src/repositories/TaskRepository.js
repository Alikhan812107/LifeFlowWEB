const { ObjectId } = require('mongodb');

class TaskRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(task) {
    await this.collection.insertOne(task);
    return task;
  }

  async getAll(userId) {
    const filter = userId ? { user_id: userId } : {};
    return await this.collection.find(filter).toArray();
  }

  async getById(id, userId) {
    const filter = { _id: new ObjectId(id) };
    if (userId) {
      filter.user_id = userId;
    }
    return await this.collection.findOne(filter);
  }

  async update(id, task, userId) {
    task._id = new ObjectId(id);
    const filter = { _id: new ObjectId(id) };
    if (userId) {
      filter.user_id = userId;
    }
    await this.collection.replaceOne(filter, task);
    return task;
  }

  async delete(id, userId) {
    const filter = { _id: new ObjectId(id) };
    if (userId) {
      filter.user_id = userId;
    }
    const result = await this.collection.deleteOne(filter);
    if (result.deletedCount === 0) {
      throw new Error('not found');
    }
  }
}

module.exports = TaskRepository;
