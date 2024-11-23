const _ = require('lodash')
const httpStatus = require('http-status')
const { ObjectId } = require('mongodb')
const ApiError = require('../../../utils/ApiError')
const dalService = require('../../dal/dal.service')
const scraperService = require('../../scraper/scraper.service')
const errorCode = require('../../../codes/error.code')

const collectionName = 'drugs'

const getDrugInteractions = async (inputDrugs) => {
  let interactions = []
  const crawler = scraperService.getCrawler(async ({ page }) => {
    // Navigate to the interaction input page
    await page.goto('https://www.drugs.com/interaction/list/', { waitUntil: 'commit' })
    // Function to add a drug and wait for the page to refresh
    async function addDrug(drugName) {
      await page.type('#livesearch-interaction', drugName)
      await page.keyboard.press('Enter') // Press Enter to select the drug
      await page.waitForTimeout(500) // Wait for the drug to be added and processed
    }
    // Add the drugs
    for (const drug of inputDrugs) {
      await addDrug(drug)
    }
    // Click the "Check Interactions" link
    await page.click('a:has-text("Check Interactions")')
    // Extract interaction data only from "Interactions between your drugs"
    interactions = await page.evaluate(() => {
      const interactionData = []
      // Locate "Interactions between your drugs" section
      const interactionSection = Array.from(document.querySelectorAll('h2')).find(
        (heading) => heading.textContent.trim().toLowerCase() === 'interactions between your drugs'
      )
      if (interactionSection) {
        const references = interactionSection.parentElement.querySelectorAll('.interactions-reference')
        references.forEach((reference) => {
          const severity = reference.querySelector('.ddc-status-label')?.innerText.trim()
          const drugs = reference.querySelector('h3')?.innerText.trim()
          // Collect all <p> tags for the full description
          const descriptionElements = reference.querySelectorAll('p')
          const description = Array.from(descriptionElements).map((p) => p.innerText)
          // Exclude food interactions and therapeutic duplication
          if (
            drugs &&
            !drugs.toLowerCase().includes('food') &&
            !drugs.toLowerCase().includes('therapeutic duplication') &&
            !severity.toLowerCase().includes('duplication')
          ) {
            interactionData.push({
              severity,
              drugs,
              description: description.slice(1, -1).join(' ')
            })
          }
        })
      }
      return interactionData
    })
  })
  await crawler.run(['https://www.drugs.com/interaction/list/'])
  return interactions
}

async function create(createDto) {
  createDto.drugs = createDto.drugs.sort()
  createDto.name = createDto.drugs.join(', ')
  const result = await dalService.readMany(collectionName, { name: createDto.name }, {})
  if (result.documents.length) return result.documents[0]
  createDto.interactions = await getDrugInteractions(createDto.drugs)
  return dalService.createOne(collectionName, createDto)
}

/**
 * Query documents
 * @param {object} queryDto - Query
 * @returns {Promise<{ pages: number, documents: [object] }>} Object of total number of pages and found documents
 */
async function query(queryDto) {
  const filters = _.omit(queryDto, ['search', 'sort', 'limit', 'page'])
  const options = _.pick(queryDto, ['sort', 'limit', 'page', 'skip'])
  if (queryDto.search) filters.name = { $regex: queryDto.search, $options: 'i' }
  if (queryDto.limit) options.skip = queryDto.limit * (queryDto.page - 1)
  if (queryDto.sort)
    options.sort = _.mapValues(
      _.keyBy(queryDto.sort.split(' '), (e) => (e[0] === '-' ? e.substring(1) : e)),
      (e) => (e[0] === '-' ? -1 : 1)
    )
  const result = await dalService.readMany(collectionName, filters, options)
  return result
}

async function getById(id) {
  const document = await dalService.readOne(collectionName, { _id: new ObjectId(id) }, {}, id)
  if (!document) throw new ApiError(httpStatus.NOT_FOUND, errorCode.NOT_FOUND)
  return document
}

async function updateById(id, updateDto) {
  const document = await dalService.updateOne(collectionName, { _id: new ObjectId(id) }, { $set: updateDto }, {}, id)
  if (!document) throw new ApiError(httpStatus.NOT_FOUND, errorCode.NOT_FOUND)
  return document
}

async function deleteById(id) {
  const deleted = await dalService.deleteOne(collectionName, { _id: new ObjectId(id) }, {}, id)
  if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, errorCode.NOT_FOUND)
  return deleted
}

const drugService = {
  create,
  query,
  getById,
  updateById,
  deleteById
}

module.exports = drugService
