const cacheControlMiddleware = (req, res, next) => {
  if (req.method === "GET") {
    // Cache for 10 minutes for all GET requests
    res.setHeader("Cache-Control", "public, max-age=600"); // Cache for 10 minutes
  } else {
    res.setHeader("Cache-Control", "no-cache"); // Disable cache for other methods (POST, PUT, etc.)
  }
  next();
};

module.exports = cacheControlMiddleware;
