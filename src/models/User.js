class User {
  constructor(data) {
    this._id = data._id || data.id;
    this.name = data.name;
    this.email = data.email;
    this.tasks_num = data.tasks_num || 0;
    this.notes_num = data.notes_num || 0;
    this.avatar = data.avatar;
  }
}

module.exports = User;
