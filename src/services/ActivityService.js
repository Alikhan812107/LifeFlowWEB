class ActivityService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(activity) {
    return await this.repo.create(activity);
  }

  async getAll() {
    return await this.repo.getAll();
  }
}

module.exports = ActivityService;
