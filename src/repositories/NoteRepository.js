const { ObjectId } = require('mongodb');

class NoteRepository {
  constructor(collection) {
    this.collection = collection;
  }
  

  async create(note) {
    await this.collection.insertOne(note);
    return note;
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

  async update(id, note, userId) {
    note._id = new ObjectId(id);
    const filter = { _id: new ObjectId(id) };
    if (userId) {
      filter.user_id = userId;
    }
    await this.collection.replaceOne(filter, note);
    return note;
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

module.exports = NoteRepository;
