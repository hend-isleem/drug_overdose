const { MongoClient } = require('mongodb');
const config = require('../../config/config.config');

const client = new MongoClient(config.mongoDB.url);
const db = client.db('production');

const mongoModule = {
  client,
  db,
};

module.exports = mongoModule;
