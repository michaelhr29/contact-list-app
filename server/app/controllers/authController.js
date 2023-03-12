const Isemail = require('isemail');

const Crypto = require('../utils/crypto');
const ResponseHelper = require('../utils/responseHelper');
const UserService = require('../services/userService');

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

    const user = await UserService.getUser(payload.email);
    if (user) {
      ResponseHelper.badRequest(req, res, 'The email already exists');
      return;
    }

    payload.password = await Crypto.hashPassword(payload.password);
    const response = await UserService.registerUser(payload);
    response.password = undefined;
    ResponseHelper.created(req, res, response);
  }
}

module.exports = {
  loginUser: AuthController.loginUser,
  registerUser: AuthController.registerUser,
};
