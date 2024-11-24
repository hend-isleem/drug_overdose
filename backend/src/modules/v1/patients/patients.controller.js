const httpStatus = require('http-status')
const _ = require('lodash')
const catchAsync = require('../../../utils/catchAsync')
const patientService = require('./patients.service')
const drugService = require('../drugs/drugs.service')

const create = catchAsync(async (req, res) => {
  const drug = await drugService.create(_.omit(req.body, ['age', 'conditions']))
  const patient = await patientService.create({ ...req.body, interactions: drug.interactions })
  res.send(patient)
})

const query = catchAsync(async (req, res) => {
  const result = await patientService.query(_.pickBy(req.query), req.user)
  res.send(result)
})

const get = catchAsync(async (req, res) => {
  const patient = await patientService.getById(req.params.id)
  res.send(patient)
})

const update = catchAsync(async (req, res) => {
  await patientService.updateById(req.params.id, req.body)
  res.status(httpStatus.NO_CONTENT).send()
})

const remove = catchAsync(async (req, res) => {
  await patientService.deleteById(req.params.id)
  res.status(httpStatus.NO_CONTENT).send()
})

const patientController = {
  create,
  query,
  get,
  update,
  remove
}

module.exports = patientController
