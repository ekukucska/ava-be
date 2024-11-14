const noCacheMiddleware = (req, res, next) => {
  // Disable caching for all requests
  res.setHeader("Cache-Control", "no-store");
  next();
};

module.exports = noCacheMiddleware;
