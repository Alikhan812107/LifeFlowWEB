const { ObjectId } = require('mongodb');

class Note {
  constructor(data) {
    this._id = data._id || new ObjectId();
    this.title = data.title;
    this.description = data.description;
    this.user_id = data.user_id;
  }
}

module.exports = Note;
