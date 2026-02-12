class SleepService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(sleep) {
    return await this.repo.create(sleep);
  }

  async getAll(userId) {
    return await this.repo.getAll(userId);
  }
}

module.exports = SleepService;
