const httpStatus = require('http-status');
const _ = require('lodash');
const catchAsync = require('../../../utils/catchAsync');
const drugService = require('./drugs.service');

const create = catchAsync(async (req, res) => {
  await drugService.create(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const query = catchAsync(async (req, res) => {
  const result = await drugService.query(_.pickBy(req.query), req.user);
  res.send(result);
});

const get = catchAsync(async (req, res) => {
  const drug = await drugService.getById(req.params.id);
  res.send(drug);
});

const update = catchAsync(async (req, res) => {
  await drugService.updateById(req.params.id, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const remove = catchAsync(async (req, res) => {
  await drugService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const drugController = {
  create,
  query,
  get,
  update,
  remove,
};

module.exports = drugController;
