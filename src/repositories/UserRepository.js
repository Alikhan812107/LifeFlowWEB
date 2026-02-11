class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async getById(id) {
    return await this.collection.findOne({ _id: id });
  }

  async updateAvatar(id, avatar) {
    const result = await this.collection.updateOne(
      { _id: id },
      { $set: { avatar: avatar } }
    );

    if (result.matchedCount === 0) {
      await this.collection.insertOne({
        _id: id,
        name: 'John Student',
        email: 'john@student.com',
        avatar: avatar
      });
    }
  }

  //  для jwt, ваши коды не трогал 

  async findByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async create(userData) {
    const result = await this.collection.insertOne(userData);
    return { _id: result.insertedId, ...userData };
  }
}

module.exports = UserRepository;
