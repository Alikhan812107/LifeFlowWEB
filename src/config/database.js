const { MongoClient } = require('mongodb');

let client;
let db;

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('need MONGO_URI');
  }

  client = new MongoClient(uri);
  await client.connect();
  db = client.db('LifeFlowWeb');
  console.log('connected to mongodb');
  return db;
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
