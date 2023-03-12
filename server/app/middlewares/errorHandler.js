const ResponseHelper = require('../utils/responseHelper');

module.exports = (err, req, res, next) => {
  const statusCode = err.status;
  const message = err.errors[0].message;

  ResponseHelper.error(req, res, statusCode, message);
};
