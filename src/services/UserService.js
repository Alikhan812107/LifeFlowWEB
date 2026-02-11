class UserService {
  constructor(repo) {
    this.repo = repo;
  }

  async getById(id) {
    return await this.repo.getById(id);
  }

  async updateAvatar(id, avatar) {
    return await this.repo.updateAvatar(id, avatar);
  }
}

module.exports = UserService;
