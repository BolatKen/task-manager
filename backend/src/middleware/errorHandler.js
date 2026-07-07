// Custom error class
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${err.message}`);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';



  // Development error response
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } 
  // Production error response
  else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.statusCode === 500 
        ? 'Something went wrong!' 
        : err.message
    });
  }
};

module.exports = {
  ApiError,
  errorHandler
};