const InvalidError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const NotAuthorization = (message) => {
  const error = new Error(message);
  error.statusCode = 401;
  return error;
};

const NotFoundError = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  return error;
};

const ServerError = (message) => {
  const error = new Error(message);
  error.statusCode = 500;
  return error;
};

module.exports = {
  NotFoundError,
  InvalidError,
  NotAuthorization,
  ServerError,
};