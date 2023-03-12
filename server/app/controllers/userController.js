const Isemail = require('isemail');

const Crypto = require('../utils/crypto');
const ResponseHelper = require('../utils/responseHelper');
const UserService = require('../services/userService');

/**
 * Handlers for /auth and /user endpoints
 */
class AuthController {
  /**
   * Private method to format the endpoints responses
   * @param {Object} data
   * @param {String} token
   * @returns Object response
   */
  static _buildAuthResponse(data, token = null) {
    const response = {
      id: data.id,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    if (token) {
      response.token = token;
    }
    return response;
  }

  /**
   * Handler for POST /auth/login
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

    const user = await UserService.getUserByEmail(payload.email);
    if (!user) {
      ResponseHelper.badRequest(req, res, 'The email not exists');
      return;
    }

    const isPasswordCorrect = await Crypto.comparePassword(payload.password, user.password);
    if (!isPasswordCorrect) {
      ResponseHelper.badRequest(req, res, 'Password is not correct');
      return;
    }

    const token = await Crypto.generateJWT(payload);
    const data = AuthController._buildAuthResponse(user, token);
    ResponseHelper.ok(req, res, data);
  }

  /**
   * Handler for POST /auth/register
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

    const user = await UserService.getUserByEmail(payload.email);
    if (user) {
      ResponseHelper.badRequest(req, res, 'The email already exists');
      return;
    }

    payload.password = await Crypto.hashPassword(payload.password);
    const response = await UserService.registerUser(payload);

    const data = AuthController._buildAuthResponse(response);
    ResponseHelper.created(req, res, data);
  }

  /**
   * Handler for GET /user/{id}
   * @param {Request} req
   * @param {Response} res
   * @returns User
   */
  static async getUser(req, res) {
    const id = req.params.id;

    const user = await UserService.getUser(id);
    if (!user) {
      ResponseHelper.badRequest(req, res, "User's id not exists");
      return;
    }

    const data = AuthController._buildAuthResponse(user);
    ResponseHelper.ok(req, res, data);
  }
}

module.exports = {
  loginUser: AuthController.loginUser,
  registerUser: AuthController.registerUser,
  getUser: AuthController.getUser,
};