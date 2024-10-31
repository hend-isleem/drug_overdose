const _ = require('lodash');
const mongoModule = require('./mongo.module');

async function insertOne(collectionName, insert, options = {}) {
  const insertBody = { ...insert, ...(!insert.createdAt && { createdAt: new Date() }) };
  const acknowledgement = await mongoModule.db.collection(collectionName).insertOne(insertBody, options);
  return { _id: acknowledgement.insertedId, ...insertBody };
}

async function find(collectionName, filter, options) {
  const documents = await mongoModule.db.collection(collectionName).find(filter, options).toArray();
  let count = 0;
  let pages = 0;
  if (options.limit && options.limit > 0) {
    count = await mongoModule.db.collection(collectionName).countDocuments(filter);
    pages = Math.ceil(count / options.limit);
  }
  return { count, pages, documents };
}

async function aggregate(collectionName, pipeline, options) {
  const documents = await mongoModule.db
    .collection(collectionName)
    .aggregate(Object.values(_.pick(pipeline, Object.keys(_.omit(pipeline, ['count'])))), options)
    .toArray();
  let count = 0;
  let pages = 0;
  let results = [];
  if (pipeline.limit?.$limit && pipeline.limit.$limit > 0) {
    results = await mongoModule.db
      .collection(collectionName)
      .aggregate(Object.values(_.pick(pipeline, ['match', 'count'])))
      .toArray();
    if (results.length) [{ count }] = results;
    pages = Math.ceil(count / pipeline.limit.$limit);
  }
  return { count, pages, documents };
}

async function findById(collectionName, filter, options) {
  return mongoModule.db.collection(collectionName).findOne(filter, options);
}

async function aggregateById(collectionName, pipeline, options) {
  const documents = await mongoModule.db
    .collection(collectionName)
    .aggregate(Object.values(Object.values(_.pick(pipeline, Object.keys(pipeline)))), options)
    .toArray();
  return documents.length ? documents[0] : null;
}

async function findOneAndUpdateById(collectionName, conditions, update, options) {
  const document = await mongoModule.db.collection(collectionName).findOneAndUpdate(conditions, update, options);
  return document;
}

async function deleteOneById(collectionName, conditions, options) {
  const ack = await mongoModule.db.collection(collectionName).deleteOne(conditions, options);
  return !!ack.deletedCount;
}

async function updateMany(collectionName, conditions, update, options) {
  return mongoModule.db.collection(collectionName).updateMany(conditions, update, options);
}

async function deleteMany(collectionName, conditions, options) {
  return mongoModule.db.collection(collectionName).deleteMany(conditions, options);
}

async function bulkWrite(collectionName, operations, options) {
  return mongoModule.db.collection(collectionName).bulkWrite(operations, options);
}

const mongoService = {
  insertOne,
  find,
  aggregate,
  findById,
  aggregateById,
  findOneAndUpdateById,
  deleteOneById,
  updateMany,
  deleteMany,
  bulkWrite,
};

module.exports = mongoService;
