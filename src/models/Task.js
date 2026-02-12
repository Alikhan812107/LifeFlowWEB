const { ObjectId } = require('mongodb');

class Task {
  constructor(data) {
    this._id = data._id || new ObjectId();
    this.title = data.title;
    this.body = data.body;
    this.done = data.done || false;
    this.folder = data.folder || 'General';
    this.user_id = data.user_id;
  }
}

module.exports = Task;
