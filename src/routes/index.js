const express = require("express");

const rootsRoutes = require("./rootsRoutes.js");
const usersRoutes = require("./usersRoutes.js");
const studiesRoutes = require("./studiesRoutes.js");
const subjectsRoutes = require("./subjectsRoutes.js");

const router = express.Router();

router.use("/", rootsRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/studies", studiesRoutes);
router.use("/api/subjects", subjectsRoutes);

module.exports = router;
