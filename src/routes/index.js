const express = require("express");

const rootsRoutes = require("./rootsRoutes.js");
const usersRoutes = require("./usersRoutes.js");
const studiesRoutes = require("./studiesRoutes.js");
const subjectsRoutes = require("./subjectsRoutes.js");
const patchesRoutes = require("./patchesRoutes.js");
const eventsRoutes = require("./eventsRoutes.js");
const anomaliesRoutes = require("./anomaliesRoutes.js");
const aggregatedStudiesRoutes = require("./aggregatedStudiesRoutes.js");
const aggregatedSubjectsRoutes = require("./aggregatedSubjectsRoutes.js");

const router = express.Router();

router.use("/", rootsRoutes);
router.use("/api/users", usersRoutes);
router.use("/api/studies", studiesRoutes);
router.use("/api/subjects", subjectsRoutes);
router.use("/api/patches", patchesRoutes);
router.use("/api/events", eventsRoutes);
router.use("/api/anomalies", anomaliesRoutes);
router.use("/api/aggregatedStudies", aggregatedStudiesRoutes);
router.use("/api/aggregatedSubjects", aggregatedSubjectsRoutes);

module.exports = router;
