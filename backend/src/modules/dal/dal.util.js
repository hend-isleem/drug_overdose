const _ = require('lodash');
const collectionConstant = require('../../constants/collections.constant');

function getUpdateKeys(update, extraKeys) {
  let updateKeys = [];
  if (Array.isArray(update)) {
    updateKeys = update.map((obj) => Object.keys(Object.values(obj)[0])).flat();
  } else {
    updateKeys = Object.keys(update).reduce((arr, key) => {
      if (key[0] === '$') arr.push(...Object.keys(update[key]).map((k) => k.split('.')[0]));
      else arr.push(key);
      return arr;
    }, []);
  }
  return [...updateKeys, ...extraKeys];
}

function projectionObject(collectionName, projection) {
  let projectObject = _.mapValues(collectionConstant[collectionName], () => 1);
  if (projection) {
    if (Object.values(projection)[0] === 0) {
      projectObject = _.omit(projectObject, Object.keys(projection));
    } else projectObject = _.pick(projectObject, Object.keys(projection));
  }
  return projectObject;
}

function aggregateProjectionObject(collectionName, pipeline) {
  return {
    $project: _.mapValues(
      _.keyBy(
        [
          ...Object.keys(projectionObject(collectionName, pipeline.project?.$project)),
          ...Object.keys(pipeline.addFields?.$addFields || {}),
          ...Object.keys(pipeline.group?.$group || {}),
          ...Object.keys(pipeline.group2?.$group || {}),
        ],
        (e) => e,
      ),
      () => 1,
    ),
  };
}

const dalUtil = {
  getUpdateKeys,
  projectionObject,
  aggregateProjectionObject,
};

module.exports = dalUtil;
