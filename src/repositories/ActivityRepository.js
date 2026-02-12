class ActivityRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(activity) {
    await this.collection.insertOne(activity);
    return activity;
  }

  async getAll(userId) {
    const filter = userId ? { user_id: userId } : {};
    return await this.collection.find(filter).sort({ timestamp: -1 }).toArray();
  }
}

module.exports = ActivityRepository;
