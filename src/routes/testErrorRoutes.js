const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const err = new Error("This is a forced error for testing purposes");
  next(err);
});

module.exports = router;
