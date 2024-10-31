const httpStatus = require('http-status');
const _ = require('lodash');
const catchAsync = require('../../../utils/catchAsync');
const contactService = require('./contacts.service');

const create = catchAsync(async (req, res) => {
  await contactService.create(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const query = catchAsync(async (req, res) => {
  const result = await contactService.query(_.pickBy(req.query), req.user);
  res.send(result);
});

const get = catchAsync(async (req, res) => {
  const contact = await contactService.getById(req.params.id);
  res.send(contact);
});

const update = catchAsync(async (req, res) => {
  await contactService.updateById(req.params.id, req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const remove = catchAsync(async (req, res) => {
  await contactService.deleteById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const contactController = {
  create,
  query,
  get,
  update,
  remove,
};

module.exports = contactController;
