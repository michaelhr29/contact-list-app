const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  /**
   * Check if a password is correct
   * @param {String} plainTextPassword
   * @param {String} hash
   * @returns True if password is correct. False in other case
   */
  static async comparePassword(plainTextPassword, hash) {
    return bcrypt.compare(plainTextPassword, hash);
  }

  /**
   * Generate a JWT
   * @param {Object} data
   * @returns JSON Web Token
   */
  static async generateJWT(data) {
    const privateKey = process.env.privateKey;
    const expiresIn = process.env.expiresIn;
    return jwt.sign(data, privateKey, { expiresIn });
  }

  /**
   * Verify if the token is correct
   * @param {String} token
   * @returns
   */
  static async verifyToken(token) {
    const privateKey = process.env.privateKey;
    return jwt.verify(token, privateKey);
  }
}

module.exports = Crypto;
