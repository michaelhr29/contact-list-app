const app = require('express')();
require('dotenv').config();

const Logger = require('./utils/logger');
const authHandler = require('./middlewares/authHandler');
const errorHandler = require('./middlewares/errorHandler');

const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const apiSpec = path.join(__dirname, 'openapi', 'api.yml');
const swaggerDocument = YAML.load(fs.readFileSync(apiSpec));
const operationHandlers = path.join(__dirname, 'controllers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    operationHandlers,
    validateSecurity: {
      handlers: {
        bearerAuth: authHandler,
      },
    },
  })
);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => Logger.info({ message: `Server listening on PORT ${PORT}` }));
