const bcrypt = require('bcrypt');

/**
 * Class helper to all the crypto actions
 */
class Crypto {
  /**
   * Generate a hash password
   * @param {String} password
   * @returns A hashed password
   */
  static async hashPassword(password) {
    const saltRounds = process.env.saltRounds;
    const salt = bcrypt.genSaltSync(Number.parseInt(saltRounds, 10));
    return bcrypt.hash(password, salt);
  }
}

module.exports = Crypto;
