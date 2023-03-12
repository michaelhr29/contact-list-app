const { StatusCodes, ReasonPhrases } = require('http-status-codes');

/**
 * Class helper to response API request
 */
class ResponseHelper {
  /**
   * 200 Ok
   * @param {Request} req
   * @param {Response} res
   * @param {Object} data
   * @param {Number} count
   */
  static ok(req, res, data = null, count = null) {
    const response = {
      statusCode: StatusCodes.OK,
      message: ReasonPhrases.OK,
    };

    if (data) {
      response.data = data;
    }
    if (count) {
      response.count = count;
    }

    res.status(response.statusCode).json(response);
  }

  /**
   * 201 Created
   * @param {Request} req
   * @param {Response} res
   * @param {Object} data
   */
  static created(req, res, data = null) {
    const response = {
      statusCode: StatusCodes.CREATED,
      message: ReasonPhrases.CREATED,
    };

    if (data) {
      response.data = data;
    }

    res.status(response.statusCode).json(response);
  }

  /**
   * 400 Bad Request
   * @param {Request} req
   * @param {Response} res
   * @param {String} error
   */
  static badRequest(req, res, error = null) {
    const response = {
      statusCode: StatusCodes.BAD_REQUEST,
      message: ReasonPhrases.BAD_REQUEST,
    };

    if (error) {
      response.error = error;
    }

    res.status(response.statusCode).json(response);
  }

  /**
   * 401 Unauthorized
   * @param {Request} req
   * @param {Response} res
   * @param {String} error
   */
  static unAuthorized(req, res, error = null) {
    const response = {
      statusCode: StatusCodes.UNAUTHORIZED,
      message: ReasonPhrases.UNAUTHORIZED,
    };

    if (error) {
      response.error = error;
    }

    res.status(response.statusCode).json(response);
  }

  /**
   * 404 Not found
   * @param {Request} req
   * @param {Response} res
   */
  static notFound(req, res) {
    const response = {
      statusCode: StatusCodes.NOT_FOUND,
      message: ReasonPhrases.NOT_FOUND,
    };

    res.status(response.statusCode).json(response);
  }

  /**
   * Error
   * @param {Request} req
   * @param {Response} res
   * @param {String} error
   */
  static error(req, res, statusCode, message, error = null) {
    const response = {
      statusCode,
      message,
    };

    if (error) {
      response.error = error;
    }

    res.status(response.statusCode).json(response);
  }
}

module.exports = ResponseHelper;
