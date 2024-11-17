const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");
const authenticateTokenMiddleware = require("../middleware/authentication/authenticateTokenMiddleware");
const noCacheMiddleware = require("../middleware/caching/noCacheMiddleware.js");

const router = express.Router();

// Use body-parser middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Apply no-cache middleware for all user routes
router.use(noCacheMiddleware); // TODO: Check if needed & co.

// Apply the authentication middleware to all routes in this router
router.use(authenticateTokenMiddleware);

router.get("/", async (req, res) => {
  try {
    const aggregatedSubjects =
      await getSubjectsWithSensorDataAnomaliesAndEvents();
    res.status(200).send(aggregatedSubjects);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve aggregated subjects.",
      error: error.message,
    });
  }
});

async function getSubjectsWithSensorDataAnomaliesAndEvents() {
  const Subject = dataService.Subject;

  try {
    const subjectsWithSensorDataAnomaliesAndEvents = await Subject.aggregate([
      {
        $lookup: {
          from: "patches",
          localField: "subject",
          foreignField: "subject",
          as: "sensorData",
        },
      },
      {
        $lookup: {
          from: "anomalies",
          localField: "subject",
          foreignField: "subject",
          as: "anomaliesData",
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "subject",
          foreignField: "subject",
          as: "eventsData",
        },
      },
      {
        $project: {
          study: 1,
          subject: 1,
          subjectData: 1,
          sensorData: {
            $map: {
              input: "$sensorData",
              as: "sensor",
              in: {
                type: "$$sensor.type",
                dateTime: "$$sensor.dateTime",
                values: "$$sensor.values",
              },
            },
          },
          anomalies: {
            $reduce: {
              input: "$anomaliesData",
              initialValue: [],
              in: {
                $concatArrays: ["$$value", "$$this.types"],
              },
            },
          },
          events: {
            $reduce: {
              input: "$eventsData",
              initialValue: [],
              in: {
                $concatArrays: ["$$value", "$$this.types"],
              },
            },
          },
        },
      },
    ]);

    return subjectsWithSensorDataAnomaliesAndEvents;
  } catch (error) {
    console.error(
      "Error aggregating subjects with sensor data, anomalies, and events:",
      error
    );
    throw error;
  }
}

module.exports = router;
