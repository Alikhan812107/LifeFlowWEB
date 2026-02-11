class SleepRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(sleep) {
    await this.collection.insertOne(sleep);
    return sleep;
  }

  async getAll() {
    return await this.collection.find({}).sort({ timestamp: -1 }).toArray();
  }
}

module.exports = SleepRepository;
