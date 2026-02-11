class ActivityRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(activity) {
    await this.collection.insertOne(activity);
    return activity;
  }

  async getAll() {
    return await this.collection.find({}).sort({ timestamp: -1 }).toArray();
  }
}

module.exports = ActivityRepository;
