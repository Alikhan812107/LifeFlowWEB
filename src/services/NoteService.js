class NoteService {
  constructor(repo) {
    this.repo = repo;
  }

  async create(note) {
    return await this.repo.create(note);
  }

  async getAll() {
    return await this.repo.getAll();
  }

  async getById(id) {
    return await this.repo.getById(id);
  }

  async update(id, note) {
    return await this.repo.update(id, note);
  }

  async delete(id) {
    return await this.repo.delete(id);
  }
}

module.exports = NoteService;
