const Logger = require('../utils/logger.js');
const models = require('../models');

models.sequelize
  .sync({
    force: false,
    logging: true,
  })
  .then(function () {
    Logger.info({ message: '> Database has been synced' });
  })
  .catch(function (err) {
    Logger.error({
      message: '> There was an issue synchronizing the database',
      err,
    });
  });
