const { ObjectId } = require('mongodb');

class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getById(id) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async updateAvatar(id, avatar) {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { avatar: avatar } }
    );
  }

  async findByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async create(userData) {
    const result = await this.collection.insertOne(userData);
    return { _id: result.insertedId, ...userData };
  }

  async getAllUsers() {
    return await this.collection.find({}).project({ password: 0 }).toArray();
  }

  async updateRole(userId, role) {
    await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: role } }
    );
  }

  async updateProfile(userId, data) {
    const updateData = {};
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;
    
    await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    );
  }
}

module.exports = UserRepository;
