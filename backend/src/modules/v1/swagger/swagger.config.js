// swagger.config.js
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: `
        Overview:
        This API allows authorized admin users to manage contacts. Users can create, retrieve, update, and delete contacts after logging in and authorizing with a JWT token.

        Steps for Authorization:
        1. Login: First, use the '/v1/auth/admin-login' endpoint with a valid admin email and password to get an access token.
        2. Retrieve Token: The response will include a JWT access token. Copy this token.
        3. Authorize: Click the Authorize button in the Swagger UI, paste the token into the prompt, and authorize.
        4. Access API: Once authorized, you can interact with the Contacts API endpoints.

        Note: Each endpoint that requires authorization has a lock icon in Swagger UI. Authorization is required for accessing contacts endpoints, as they are restricted to admin users only.
      `,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format **Bearer &lt;token&gt;**',
        },
      },
    },
  },
  apis: [`${__dirname}/../auth/auth.route.js`, `${__dirname}/../contacts/contacts.route.js`],
});
