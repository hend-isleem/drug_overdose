const express = require('express');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const validate = require('../../../middlewares/validate.middleware');

const authRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API to authorize admin users
 */

/**
 * @swagger
 * /v1/auth/admin-login:
 *   post:
 *     summary: Admin login to obtain an access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@sesa1.com
 *               password:
 *                 type: string
 *                 example: password1
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     access:
 *                       type: string
 *                       example: "Bearer eyJhbGciOi..."
 *                     refresh:
 *                       type: string
 *                       example: "Bearer eyJhbGciOi..."
 */

authRoute.post('/admin-login', validate(authValidation.login), authController.adminLogin);
authRoute.post('/logout', validate(authValidation.logout), authController.logout);
authRoute.post('/refresh-tokens', validate(authValidation.logout), authController.refreshTokens);

module.exports = authRoute;
