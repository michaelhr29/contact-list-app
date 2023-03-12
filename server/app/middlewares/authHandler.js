const Crypto = require('../utils/crypto');
const ResponseHelper = require('../utils/responseHelper');

module.exports = async (req, scopes, schema) => {
  const authorization = req.headers.authorization.split(' ');
  const [authType, authValue] = authorization;

  const response = await Crypto.verifyToken(authValue);
  if (!response) {
    ResponseHelper.badRequest(req, res, 'Authorization is not in the right format');
    return;
  }

  req._user = response;
  return true;
};
