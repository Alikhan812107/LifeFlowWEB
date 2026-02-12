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

  //  ДЛЯ JWT
  async findByEmail(email) {
    return await this.repo.findByEmail(email);
  }

  async createUser(data) {
    return await this.repo.create(data);
  }

  async getAllUsers() {
    return await this.repo.getAllUsers();
  }

  async updateRole(userId, role) {
    return await this.repo.updateRole(userId, role);
  }
}

module.exports = UserService;
