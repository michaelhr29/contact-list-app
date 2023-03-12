const Isemail = require('isemail');
const ResponseHelper = require('../utils/responseHelper');
const Crypto = require('../utils/crypto');

/**
 * Handlers for /auth endpoints
 */
class AuthController {
  /**
   * Handler for /auth/login
   * @param {Request} req
   * @param {Response} res
   */
  static async loginUser(req, res) {
    const payload = req.body;

    const isValidEmail = Isemail.validate(payload.email);
    if (!isValidEmail) {
      ResponseHelper.badRequest(req, res, "The email's format is not valid");
      return;
    }
  }

  /**
   * Handler for /auth/register
   * @param {Request} req
   * @param {Response} res
   */
  static async registerUser(req, res) {
    const payload = req.body;

    const isValidEmail = Isemail.validate(payload.email);
    if (!isValidEmail) {
      ResponseHelper.badRequest(req, res, "The email's format is not valid");
      return;
    }

    payload.password = await Crypto.hashPassword(payload.password);
    console.log('payload', payload);
  }
}

module.exports = {
  loginUser: AuthController.loginUser,
  registerUser: AuthController.registerUser,
};
