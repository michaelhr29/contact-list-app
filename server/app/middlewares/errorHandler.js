const ResponseHelper = require('../utils/responseHelper');

module.exports = (err, req, res, next) => {
  const statusCode = err.status;
  console.log(err);
  const { message } = err.errors[0];

  ResponseHelper.error(req, res, statusCode, message);
};
