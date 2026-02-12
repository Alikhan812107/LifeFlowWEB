class TaskService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(task) {
    return await this.repo.create(task);
  }

  async getAll(userId) {
    return await this.repo.getAll(userId);
  }

  async getById(id, userId) {
    return await this.repo.getById(id, userId);
  }

  async update(id, task, userId) {
    return await this.repo.update(id, task, userId);
  }

  async delete(id, userId) {
    return await this.repo.delete(id, userId);
  }
}

module.exports = TaskService;
