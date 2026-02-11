const { ObjectId } = require('mongodb');

class Nutrition {
  constructor(data) {
    this._id = data._id || new ObjectId();
    this.calories = data.calories;
    this.water = data.water;
    this.healthy = data.healthy;
    this.user_id = data.user_id;
    this.timestamp = data.timestamp || new Date();
  }
}

module.exports = Nutrition;
