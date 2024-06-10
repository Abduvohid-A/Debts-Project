class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name; 
    this.statusCode = statusCode;
  };

  static validationError(statusCode, message) {
    return res.status(statusCode).send(message);
  }

  static serverError(statusCode, message) {
    return res.status(statusCode).send(message);
  }
}

export default ApiError;
