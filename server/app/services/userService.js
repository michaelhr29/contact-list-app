const Users = require('../models').User;

/**
 * Service for fetch all user information
 */
class UserService {
  /**
   * Get a user given its email
   * @param {String} email
   * @returns User
   */
  static async getUser(email) {
    return Users.findOne({
      where: { email },
      attributes: ['id', 'name', 'lastname', 'email', 'createdAt', 'updatedAt'],
    });
  }

  /**
   * Create a new user
   * @param {Object} user
   * @returns User's created
   */
  static async registerUser(user) {
    return Users.create(user);
  }
}

module.exports = UserService;
