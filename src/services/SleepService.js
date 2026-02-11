class SleepService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(sleep) {
    return await this.repo.create(sleep);
  }

  async getAll() {
    return await this.repo.getAll();
  }
}

module.exports = SleepService;
