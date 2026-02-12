class NutritionService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(nutrition) {
    return await this.repo.create(nutrition);
  }

  async getAll(userId) {
    return await this.repo.getAll(userId);
  }
}

module.exports = NutritionService;
