const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send(`
    AVA - BE
  `);
});

module.exports = router;
