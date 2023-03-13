const sequelize = require('../lib/db');
const Account = require('../models/Account');
const User = require('../models/User');

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
  static async registerUser(data) {
    const t = await sequelize.transaction();

    try {
      const user = await User.create(data, { transaction: t });

      const accountData = {
        name: user.name,
        userId: user.id,
        lang: process.env.lang,
      };
      const account = await Account.create(accountData, { transaction: t });

      await t.commit();
      return Object.assign(user, account);
    } catch (error) {
      await t.rollback();
    }
  }

  static async putUser(id, data) {
    return User.update(data, { where: id });
  }
}

module.exports = UserService;
