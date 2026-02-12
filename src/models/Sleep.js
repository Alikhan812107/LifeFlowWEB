const { ObjectId } = require('mongodb');

class Sleep {
  constructor(data) {
    this._id = data._id || new ObjectId();
    this.woke_up = data.woke_up;
    this.slept = data.slept;
    this.user_id = data.user_id;
    this.timestamp = data.timestamp || new Date();
  }
  
}

module.exports = Sleep;
