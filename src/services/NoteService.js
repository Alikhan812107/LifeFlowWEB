class NoteService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(note) {
    return await this.repo.create(note);
  }

  async getAll(userId) {
    return await this.repo.getAll(userId);
  }

  async getById(id, userId) {
    return await this.repo.getById(id, userId);
  }

  async update(id, note, userId) {
    return await this.repo.update(id, note, userId);
  }

  async delete(id, userId) {
    return await this.repo.delete(id, userId);
  }
}

module.exports = NoteService;
