class NutritionService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(nutrition) {
    return await this.repo.create(nutrition);
  }

  async getAll() {
    return await this.repo.getAll();
  }
}

module.exports = NutritionService;
