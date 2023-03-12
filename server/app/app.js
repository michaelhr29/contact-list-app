const app = require('express')();
require('dotenv').config();

const Logger = require('./utils/logger');

const fs = require('fs');
const YAML = require('js-yaml');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');

const apiSpec = path.join(__dirname, 'openapi', 'api.yml');
const swaggerDocument = YAML.load(fs.readFileSync(apiSpec));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
  })
);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  Logger.info({ message: `Server listening on PORT ${PORT}` })
);
