class NutritionRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async create(nutrition) {
    await this.collection.insertOne(nutrition);
    return nutrition;
  }

  async getAll() {
    return await this.collection.find({}).sort({ timestamp: -1 }).toArray();
  }
}

module.exports = NutritionRepository;
