const _ = require('lodash')
const httpStatus = require('http-status')
const { ObjectId } = require('mongodb')
const ApiError = require('../../../utils/ApiError')
const dalService = require('../../dal/dal.service')
const errorCode = require('../../../codes/error.code')
const ollamaService = require('../../ollama/ollama.service')

const collectionName = 'patients'

async function create(createDto) {
  const patientInformation = { age: createDto.age, conditions: createDto.conditions }
  const prompt = `
You are a highly knowledgeable medical assistant specializing in drug interactions. Your task is to evaluate a patient's medication regimen and provide a detailed analysis in JSON format based on the following information.

### Patient Information:
${JSON.stringify(patientInformation)}

### Interaction Warnings from Dataset:
${
  !createDto.interactions.length
    ? 'No Interaction warnings were found in the dataset.'
    : JSON.stringify(createDto.interactions)
}

### Instructions:
1. If interaction warnings are provided, base your response primarily on them.
2. If no interaction warnings were found in the dataset, analyze the medications using your own knowledge and generate the response.
3. Summarize the interaction in clear and straightforward language.
4. Highlight the severity of the interaction (e.g., Unknown, Minor, Moderate, Major) or state "None" if there is no significant interaction.
5. Suggest alternative medications if applicable.
6. Provide actionable recommendations for the healthcare provider if applicable.

### Interaction Warnings from Dataset Example:
[
  {
    severity: 'Moderate',
    drugs: 'ibuprofen  lisinopril',
    description: 'Talk to your doctor before using lisinopril together with ibuprofen. Combining these medications may reduce the effects of lisinopril in lowering blood pressure. In addition, these medications may affect your kidney function, especially when they are used together frequently or chronically. You are more likely to develop impaired kidney function during treatment with these medications if you are also using a diuretic ("water pill") or if you are elderly or have preexisting kidney disease. You may need a dose adjustment or more frequent monitoring by your doctor to safely use both medications. Contact your doctor if you experience signs and symptoms that may suggest kidney damage such as nausea, vomiting, loss of appetite, increased or decreased urination, sudden weight gain or weight loss, fluid retention, swelling, shortness of breath, muscle cramps, tiredness, weakness, dizziness, confusion, and irregular heart rhythm. It is important to tell your doctor about all other medications you use, including vitamins and herbs. Do not stop using any medications without first talking to your doctor.'
  }
]

### Output Example:
Provide the response in the following JSON structure:
{
  "interactionSeverity": "Moderate",
  "summary": "Combining lisinopril and ibuprofen may reduce the effectiveness of lisinopril in lowering blood pressure and increase the risk of kidney damage, particularly in elderly patients or those with preexisting kidney conditions.",
  "recommendations": "Monitor kidney function and blood pressure regularly. Consider alternative pain relievers such as acetaminophen. Discuss with the patient the importance of hydration and avoiding chronic use of ibuprofen.",
  "alternativeMedications": "Acetaminophen"
}

### Important:
- If no significant interaction exists, clearly state so in the "summary" field.
- Do not include any explanation or additional text outside the JSON.
- Only return the JSON object.

Now, process the information provided and generate the JSON response. Ensure your response is professional and concise.
`
  createDto.drugs = createDto.drugs.sort()
  createDto.name = createDto.drugs.join(', ')
  const interactions = await ollamaService.chat(prompt)
  createDto.interactions = JSON.parse(interactions.message.content)
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

const patientService = {
  create,
  query,
  getById,
  updateById,
  deleteById
}

module.exports = patientService
