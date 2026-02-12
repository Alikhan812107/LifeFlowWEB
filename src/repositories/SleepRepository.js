class SleepRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(sleep) {
    await this.collection.insertOne(sleep);
    return sleep;
  }

  async getAll(userId) {
    const filter = userId ? { user_id: userId } : {};
    return await this.collection.find(filter).sort({ timestamp: -1 }).toArray();
  }
}

module.exports = SleepRepository;
