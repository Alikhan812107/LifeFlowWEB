class ActivityService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(activity) {
    return await this.repo.create(activity);
  }

  async getAll(userId) {
    return await this.repo.getAll(userId);
  }
}

module.exports = ActivityService;
