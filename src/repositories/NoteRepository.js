const { ObjectId } = require('mongodb');

class NoteRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(note) {
    await this.collection.insertOne(note);
    return note;
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async getById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, note) {
    note._id = new ObjectId(id);
    await this.collection.replaceOne({ _id: new ObjectId(id) }, note);
    return note;
  }

  async delete(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      throw new Error('not found');
    }
  }
}

module.exports = NoteRepository;
