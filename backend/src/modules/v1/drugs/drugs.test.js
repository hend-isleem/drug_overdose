const chai = require('chai')
const chaiHttp = require('chai-http')
const supertest = require('supertest')
const httpStatus = require('http-status')
const app = require('../../app/app.module')

app.set('trust proxy', false)
const { expect } = chai
chai.use(chaiHttp)
const request = supertest(app)

describe('Auth Routes', async function () {
  this.timeout(20000)

  describe('POST /', () => {
    it('should return interaction warnings between the drugs', async () => {
      const res = await request.post('/v1/drugs').send({
        drugs: ['Lisinopril', 'Atorvastatin', 'Ibuprofen']
      })
      expect(res.status).to.equal(httpStatus.OK)
      expect(res.body).to.deep.equal({
        _id: '6739527c934ecc31f543e84c',
        drugs: ['Atorvastatin', 'Ibuprofen', 'Lisinopril'],
        name: 'Atorvastatin, Ibuprofen, Lisinopril',
        interactions: [
          {
            severity: 'Moderate',
            drugs: 'ibuprofen  lisinopril',
            description:
              'Talk to your doctor before using lisinopril together with ibuprofen. Combining these medications may reduce the effects of lisinopril in lowering blood pressure. In addition, these medications may affect your kidney function, especially when they are used together frequently or chronically. You are more likely to develop impaired kidney function during treatment with these medications if you are also using a diuretic ("water pill") or if you are elderly or have preexisting kidney disease. You may need a dose adjustment or more frequent monitoring by your doctor to safely use both medications. Contact your doctor if you experience signs and symptoms that may suggest kidney damage such as nausea, vomiting, loss of appetite, increased or decreased urination, sudden weight gain or weight loss, fluid retention, swelling, shortness of breath, muscle cramps, tiredness, weakness, dizziness, confusion, and irregular heart rhythm. It is important to tell your doctor about all other medications you use, including vitamins and herbs. Do not stop using any medications without first talking to your doctor.'
          }
        ],
        createdAt: '2024-11-17T02:18:36.004Z'
      })
    })

    it('should return validation error for missing drugs data', async () => {
      const res = await request.post('/v1/drugs').send()
      expect(res.status).to.equal(httpStatus.BAD_REQUEST)
    })
  })
})
