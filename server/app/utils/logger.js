const bunyan = require('bunyan');
const moment = require('moment');

/**
 * Class helper to print logs
 */
class Logger {
  constructor() {
    this.bunyanClient = bunyan.createLogger({ name: process.env.bunyanClient });
  }

  /**
   * Object with the info to print the info message
   * @param {Object} message
   */
  info(message) {
    const time = moment().format();
    this.bunyanClient.info({ ...message, time });
  }

  /**
   * Object with the info to print the error message
   * @param {Object} message
   */
  error(message) {
    const time = moment().format();
    this.bunyanClient.error({ ...message, time });
  }

  /**
   * Object with the info to print the warning message
   * @param {Object} message
   */
  warn(message) {
    const time = moment().format();
    this.bunyanClient.warn({ ...message, time });
  }

  /**
   * Object with the info to print the debugging message
   * @param {Object} message
   */
  debug(message) {
    const time = moment().format();
    this.bunyanClient.debug({ ...message, time });
  }


module.exports = new Logger();
