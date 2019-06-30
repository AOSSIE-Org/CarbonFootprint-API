const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

const customSwaggerCSS = `
  .swagger-ui .topbar {
    display: none;
  }
  .swagger-ui {
    margin-left: auto;
    margin-right: auto;
    max-width: 750px;
  }
`;

const options = {
  showExplorer: true,
  swaggerDefinition: {
    openapi: '3.0.1',
    servers: [
      { url: 'http://localhost:3080/v1', description: 'For local development server' },
      { url: 'https://www.carbonhub.org/v1', description: 'To test live CarbonFootprint-API' },
    ],
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'access-key',
        },
      },
    },
    info: {
      title: 'CarbonFootprint-API',
      version: '1.0.0',
      description: 'Descriptive API documentation for CarbonFootprint-API',
      contact: {
        email: 'thakursaurabh1998@gmail.com',
      },
    },
    tags: [
      { name: 'Emissions', description: 'Emission APIs' },
      { name: 'Transport', description: 'Transport APIs' },
      { name: 'Global', description: 'Global emissions APIs' },
      { name: 'Default', description: 'Common APIs' },
    ],
  },
  apis: ['./api/v1/routes/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
// Swagger json served at /api/doc/json
router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// Swagger UI served at /api/doc
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { customCss: customSwaggerCSS }));

module.exports = router;
