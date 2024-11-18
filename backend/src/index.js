const logger = require('./modules/winston/winston.logger')
const mongoModule = require('./modules/mongo/mongo.module')
const indexConstant = require('./constants/indexes.constant')
const app = require('./modules/app/app.module')
const config = require('./config/config.config')

let server
mongoModule.client.connect().then(async () => {
  logger.info('MongoDB Connected...')
  Object.keys(indexConstant).forEach(async (collectionName) => {
    const collection = mongoModule.db.collection(collectionName)
    // await mongoModule.db.collection(collectionName).dropIndexes();
    Object.values(indexConstant[collectionName]).forEach(async (index) => collection.createIndex(...index))
  })
  logger.info('Scripts done')
  server = app.listen(config.port, () => logger.info(`Listening to port ${config.port}`))
})

const unexpectedErrorHandler = async (error) => {
  logger.error(error)
  if (server)
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  else process.exit(1)
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
process.on('SIGTERM', unexpectedErrorHandler)
process.on('SIGINT', unexpectedErrorHandler)
