const redis = require('ioredis');
const config = require('../../config/config.config');
const logger = require('../winston/winston.logger');

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

client.on('connect', () => {
  logger.info('Connected to Redis');
  client.flushall();
  logger.info('Redis flushing');
});

client.on('error', (error) => {
  throw new Error(`Redis error: ${error}`);
});

async function hdel(key, subKeys) {
  const ack = await client.hdel(key, ...subKeys);
  return ack === subKeys.length;
}

async function del(keysArray) {
  const ack = await client.del(keysArray);
  return ack === keysArray.length;
}

async function hkeys(key) {
  return client.hkeys(key);
}

async function keys(key) {
  return client.keys(key);
}

async function hget(key, filters) {
  const cached = await client.hget(key, JSON.stringify(filters));
  return cached ? JSON.parse(cached) : null;
}

async function hset(key, filters, result) {
  const ack = await client.hset(key, JSON.stringify(filters), JSON.stringify(result));
  return !!ack;
}

async function get(key) {
  const cached = await client.get(key);
  return cached ? JSON.parse(cached) : null;
}

async function set(key, result, shouldExpire = false, seconds = 60 * 60) {
  let ack;
  if (shouldExpire) ack = await client.set(key, JSON.stringify(result), 'EX', seconds);
  else ack = await client.set(key, JSON.stringify(result));
  return !!ack;
}

async function expire(key, seconds) {
  return client.expire(key, seconds);
}

async function updateByIdInvalidation(collectionName, idValue, updateKeys) {
  const pipeline1 = client.pipeline();
  pipeline1.hkeys(`${collectionName}`);
  pipeline1.hkeys(`${collectionName}:${idValue}`);
  const results = await pipeline1.exec();
  const hashesKeys = results.map((result) => (result.length < 1 ? [] : result[1]));
  const keysToBeDeleted = [[], []];
  hashesKeys.forEach((hashKeys, i) =>
    hashKeys.forEach((key) => {
      const optionsOrPipeline = JSON.parse(key);
      let projectionObject = {};
      if (optionsOrPipeline.projection) projectionObject = optionsOrPipeline.projection;
      if (optionsOrPipeline.project?.$project) projectionObject = optionsOrPipeline.project?.$project;
      const projectionKeys = Object.keys(projectionObject);
      if (projectionKeys.length) {
        if (projectionKeys.filter((prop) => updateKeys.includes(prop)).length) keysToBeDeleted[i].push(key);
      } else keysToBeDeleted[i].push(key);
    }),
  );
  const pipeline2 = client.pipeline();
  if (keysToBeDeleted[0].length) pipeline2.hdel(`${collectionName}`, ...keysToBeDeleted[0]);
  if (keysToBeDeleted[1].length) pipeline2.hdel(`${collectionName}:${idValue}`, ...keysToBeDeleted[1]);
  await pipeline2.exec();
}

function deleteCollectionKeys(collectionName) {
  const stream = client.scanStream({ match: `*${collectionName}*` });
  const pipeline = client.pipeline();
  stream.on('data', (streamKeys) => pipeline.del(streamKeys));
  stream.on('end', () => pipeline.exec());
  stream.on('error', (err) => logger.error(err.message));
}

const redisService = {
  hdel,
  del,
  hkeys,
  keys,
  hget,
  hset,
  get,
  set,
  expire,
  updateByIdInvalidation,
  deleteCollectionKeys,
};

module.exports = redisService;
