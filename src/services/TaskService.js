class TaskService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(task) {
    return await this.repo.create(task);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id) {
    return await this.repo.getById(id);
  }

  async update(id, task) {
    return await this.repo.update(id, task);
  }

  async delete(id) {
    return await this.repo.delete(id);
  }
}

module.exports = TaskService;
