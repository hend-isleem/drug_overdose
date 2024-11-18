const mjml2html = require('mjml')
const nodemailer = require('nodemailer')
const path = require('path')
const pug = require('pug')
const ApiError = require('../../utils/ApiError')
const errorCode = require('../../codes/error.code')
const config = require('../../config/config.config')
const logger = require('../winston/winston.logger')

const transport = nodemailer.createTransport(config.mail)

transport
  .verify()
  .then(() => logger.info('Connected to email server'))
  .catch((error) => logger.warn(`Unable to connect to email server, ${error.message}.`))

/**
 * Generate HTML from pug template
 * @param {string} template - Template name in templates folder
 * @param {object} data - Data to be used in email
 * @returns {string} HTML
 */
const generateHTMLwPUG = (template, data) => {
  const { html, errors } = mjml2html(pug.renderFile(path.join(__dirname, `../../templates/${template}.pug`), data))
  if (errors && errors.length) throw new ApiError(errors[0].message)
  return html
}

/**
 * Send an email
 * @param {nodemailer.Transport} transporter - Transporter
 * @param {object} mail - Mail
 * @param {string} [mail.to] - User email
 * @param {string} [mail.subject] - Email subject
 * @param {string} [mail.html] - Email body in html
 * @returns {Promise<object>} Object of acknowledgment
 */
const sendEmail = async (transporter, mail) => transporter.sendMail(mail)

/**
 * Send confirmation email
 * @param {string} to - User email
 * @param {string} name - User name
 * @param {string} code - Verification code
 * @param {function} t - Translation function
 * @returns {Promise<object>} Object of acknowledgment
 */
const sendConfirmationEmail = async (to, name, code, t) =>
  sendEmail(transport, {
    from: config.SMTP.auth.user,
    to,
    subject: t(errorCode.CONFIRMATION_SUBJECT),
    html: generateHTMLwPUG('confirmation', { name, code, t })
  })

/**
 * Send confirmation email
 * @param {string} to - User email
 * @param {string} code - Verification code
 * @param {function} t - Translation function
 * @returns {Promise<object>} Object of acknowledgment
 */
const sendResetPasswordEmail = async (to, code, t) =>
  sendEmail(transport, {
    from: config.mail.auth.user,
    to,
    subject: t(errorCode.RESET_SUBJECT),
    html: generateHTMLwPUG('reset', { code, t })
  })

/**
 * Send registration email
 * @param {string} to - User email
 * @param {string} name - User name
 * @param {string} password - password
 * @param {function} t - Translation function
 * @returns {Promise<object>} Object of acknowledgment
 */
const sendRegistrationEmail = async (to, name, password, t) =>
  sendEmail(transport, {
    from: config.mail.auth.user,
    to,
    subject: t(errorCode.REGISTRATION_SUBJECT),
    html: generateHTMLwPUG('registration', { name, password, t })
  })

/**
 * Send an email
 * @param {string} from - Contact Email
 * @param {string} subject - Subject
 * @param {string} text - Message
 * @returns {Promise<object>} Object of acknowledgment
 */
const startConversation = async (subject, text) =>
  sendEmail(transport, { from: config.mail.auth.user, to: config.mail.auth.user, subject, text })

const nodemailerService = {
  sendConfirmationEmail,
  sendResetPasswordEmail,
  sendRegistrationEmail,
  startConversation
}

module.exports = nodemailerService
