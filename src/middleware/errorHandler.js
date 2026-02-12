class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = 'Validation Error';
  }

  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Token expired';
  }

  if (err.message === 'not found') {
    err.statusCode = 404;
    err.message = 'Resource not found';
  }

  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message
  });
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = { errorHandler, asyncHandler, AppError };
