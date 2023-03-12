const Isemail = require('isemail');
const ResponseHelper = require('../utils/responseHelper');

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

    console.log('dentor');
  }
}

module.exports = {
  loginUser: AuthController.loginUser,
};
