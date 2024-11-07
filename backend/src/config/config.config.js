const Ajv = require('ajv');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const ajv = new Ajv({ allErrors: true, messages: false, removeAdditional: true, useDefaults: true, coerceTypes: true });
require('ajv-formats')(ajv);
require('ajv-keywords')(ajv);

const envVarsSchema = {
  type: 'object',
  minProperties: 1,
  properties: {
    TZ: { type: 'string', default: 'Africa/Cairo' },
    NODE_ENV: { type: 'string', enum: ['production', 'development'], default: 'development' },
    PORT: { type: 'integer', default: 3000 },
    MONGODB_URL: { type: 'string' },
    JWT_SECRET: { type: 'string' },
    JWT_ACCESS_EXPIRATION_HOURS: { type: 'integer', default: 1 },
    JWT_REFRESH_EXPIRATION_MONTHS: { type: 'integer', default: 1 },
    REDIS_HOST: { type: 'string' },
    REDIS_PORT: { type: 'string' },
    REDIS_PASSWORD: { type: 'string' },
  },
  allRequired: true,
  additionalProperties: true,
};

const validate = ajv.compile(envVarsSchema);
const valid = validate(process.env);
console.log("pizza");
console.log(valid);
if (!valid) throw new Error(ajv.errorsText(validate.errors, { separator: '\n' }));

const config = {
  timezone: process.env.TZ,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoDB: {
    url: process.env.MONGODB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    access_expiration_hours: process.env.JWT_ACCESS_EXPIRATION_HOURS,
    refresh_expiration_months: process.env.JWT_REFRESH_EXPIRATION_MONTHS,
    verification_code_expiration_hours: process.env.JWT_ACCESS_EXPIRATION_HOURS,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};

module.exports = config;
