const express = require('express');
const auth = require('../../../middlewares/auth.middleware');
const validate = require('../../../middlewares/validate.middleware');
const contactValidation = require('./contacts.validation');
const contactController = require('./contacts.controller');
const roleConstant = require('../../../constants/roles.constant');

const contactRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API to manage contacts
 */

/**
 * @swagger
 * /v1/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phoneNumber:
 *                 type: string
 *                 example: "123-456-7890"
 *               contactEmail:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               subject:
 *                 type: string
 *                 example: Inquiry
 *               message:
 *                 type: string
 *                 example: "Hello, I have a question about your services."
 *     responses:
 *       204:
 *         description: Contact created successfully (no content)
 *       400:
 *         description: Invalid request
 */
contactRoute.post('/', validate(contactValidation.create), contactController.create);

/**
 * @swagger
 * /v1/contacts:
 *   get:
 *     summary: Retrieve a list of contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pages:
 *                   type: integer
 *                   example: 1
 *                 documents:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 604b22f8f1d3c7000eac47ab
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       phoneNumber:
 *                         type: string
 *                         example: "123-456-7890"
 *                       contactEmail:
 *                         type: string
 *                         format: email
 *                         example: john.doe@example.com
 *                       subject:
 *                         type: string
 *                         example: Inquiry
 *                       message:
 *                         type: string
 *                         example: "Hello, I have a question about your services."
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
contactRoute.get('/', auth(roleConstant.ADMIN), validate(contactValidation.get), contactController.query);

contactRoute
  .route('/:id')
  /**
   * @swagger
   * /v1/contacts/{id}:
   *   get:
   *     summary: Get a contact by ID
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           example: 604b22f8f1d3c7000eac47ab
   *     responses:
   *       200:
   *         description: Contact details retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 phoneNumber:
   *                   type: string
   *                 contactEmail:
   *                   type: string
   *                 subject:
   *                   type: string
   *                 message:
   *                   type: string
   *       404:
   *         description: Contact not found
   */
  .get(auth(roleConstant.ADMIN), validate(contactValidation.remove), contactController.get)

  /**
   * @swagger
   * /v1/contacts/{id}:
   *   patch:
   *     summary: Update an existing contact
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           example: 604b22f8f1d3c7000eac47ab
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               contacted:
   *                 type: boolean
   *                 example: true
   *     responses:
   *       204:
   *         description: Contact updated successfully (no content)
   *       404:
   *         description: Contact not found
   */
  .patch(auth(roleConstant.ADMIN), validate(contactValidation.update), contactController.update)

  /**
   * @swagger
   * /v1/contacts/{id}:
   *   delete:
   *     summary: Delete a contact by ID
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           example: 604b22f8f1d3c7000eac47ab
   *     responses:
   *       204:
   *         description: Contact deleted successfully (no content)
   *       404:
   *         description: Contact not found
   */
  .delete(auth(roleConstant.ADMIN), validate(contactValidation.remove), contactController.remove);

module.exports = contactRoute;
