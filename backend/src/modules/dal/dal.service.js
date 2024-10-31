const dalUtil = require('./dal.util');
const mongoService = require('../mongo/mongo.service');
const redisService = require('../redis/redis.service');

async function createOne(collectionName, dto) {
  const document = await mongoService.insertOne(collectionName, dto);
  await redisService.del([collectionName]);
  return document;
}

async function readOne(collectionName, filter, options, idValue) {
  options.projection = dalUtil.projectionObject(collectionName, options.projection);
  const cached = await redisService.hget(`${collectionName}:${idValue}`, { ...filter, ...options });
  if (cached) return cached;
  const document = await mongoService.findById(collectionName, filter, options);
  if (document) await redisService.hset(`${collectionName}:${idValue}`, { ...filter, ...options }, document);
  return document;
}

async function readMany(collectionName, filter, options) {
  options.projection = dalUtil.projectionObject(collectionName, options.projection);
  const cached = await redisService.hget(collectionName, { ...filter, ...options });
  if (cached) return cached;
  const result = await mongoService.find(collectionName, filter, options);
  await redisService.hset(collectionName, { ...filter, ...options }, result);
  return result;
}

async function aggregateReadOne(collectionName, pipeline, options, idValue) {
  pipeline.project = dalUtil.aggregateProjectionObject(collectionName, pipeline);
  const cached = await redisService.hget(`${collectionName}:${idValue}`, { ...pipeline, ...options });
  if (cached) return cached;
  const document = await mongoService.aggregateById(collectionName, pipeline, options);
  if (document) await redisService.hset(`${collectionName}:${idValue}`, { ...pipeline, ...options }, document);
  return document;
}

async function aggregateReadMany(collectionName, pipeline, options) {
  pipeline.project = dalUtil.aggregateProjectionObject(collectionName, pipeline);
  const cached = await redisService.hget(collectionName, { ...pipeline, ...options });
  if (cached) return cached;
  const result = await mongoService.aggregate(collectionName, pipeline, options);
  await redisService.hset(collectionName, { ...pipeline, ...options }, result);
  return result;
}

async function updateOne(collectionName, conditions, update, options, idValue, updateKeys = []) {
  updateKeys = dalUtil.getUpdateKeys(update, updateKeys);
  const document = await mongoService.findOneAndUpdateById(collectionName, conditions, update, options);
  if (document) await redisService.updateByIdInvalidation(collectionName, idValue, updateKeys);
  return document;
}

async function updateMany(collectionName, conditions, update, options) {
  const ack = await mongoService.updateMany(collectionName, conditions, update, options);
  redisService.deleteCollectionKeys(collectionName);
  return ack;
}

async function deleteOne(collectionName, conditions, options, idValue) {
  const deleted = await mongoService.deleteOneById(collectionName, conditions, options);
  await redisService.del([collectionName, `${collectionName}:${idValue}`]);
  return deleted;
}

async function deleteMany(collectionName, conditions, options) {
  const ack = await mongoService.deleteMany(collectionName, conditions, options);
  redisService.deleteCollectionKeys(collectionName);
  return ack;
}

async function bulkWrite(collectionName, operations, options) {
  const ack = await mongoService.bulkWrite(collectionName, operations, options);
  redisService.deleteCollectionKeys(collectionName);
  return ack;
}

const dalService = {
  createOne,
  readOne,
  readMany,
  aggregateReadOne,
  aggregateReadMany,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  bulkWrite,
};

module.exports = dalService;
