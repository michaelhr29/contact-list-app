const User = require('../models').User;

/**
 * Service for fetch all user information
 */
class UserService {
  /**
   * Get a user given its id
   * @param {Number} id
   * @returns User
   */
  static async getUser(id) {
    return User.findOne({ where: { id } });
  }

  /**
   * Get a user given its email
   * @param {String} email
   * @returns User
   */
  static async getUserByEmail(email) {
    return User.findOne({ where: { email } });
  }

  /**
   * Create a new user
   * @param {Object} user
   * @returns User's created
   */
  static async registerUser(user) {
    return User.create(user);
  }

  static async putUser(id, data) {
    return User.update(data, { where: id });
  }
}

module.exports = UserService;
