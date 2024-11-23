const { PlaywrightCrawler, Configuration } = require('crawlee')

const getCrawler = (requestHandler, failedRequestHandler) =>
  new PlaywrightCrawler(
    {
      requestHandler,
      failedRequestHandler,
      maxRequestRetries: 0,
      maxSessionRotations: 1000,
      navigationTimeoutSecs: 5,
      requestHandlerTimeoutSecs: 5
    },
    new Configuration({
      availableMemoryRatio: 1
    })
  )

module.exports = { getCrawler }
