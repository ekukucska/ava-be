function errorHandler(err, req, res, next) {
  console.error(err.stack);

  // Set default status code and message
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}

module.exports = errorHandler;
