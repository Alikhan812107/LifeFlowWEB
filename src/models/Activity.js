const { ObjectId } = require('mongodb');

class Activity {
  constructor(data) {
    this._id = data._id || new ObjectId();
    this.description = data.description;
    this.user_id = data.user_id;
    this.timestamp = data.timestamp || new Date();
  }
}


module.exports = Activity;
