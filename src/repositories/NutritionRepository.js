class NutritionRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(nutrition) {
    await this.collection.insertOne(nutrition);
    return nutrition;
  }

  async getAll(userId) {
    const filter = userId ? { user_id: userId } : {};
    return await this.collection.find(filter).sort({ timestamp: -1 }).toArray();
  }
}

module.exports = NutritionRepository;
