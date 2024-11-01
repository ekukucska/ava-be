const express = require("express");
const dataService = require("../models/dataService.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const aggregatedStudies = await getStudiesWithParticipants();
    res.status(200).send(aggregatedStudies);
  } catch (error) {
    res.status(500).send({
      message: "Failed to retrieve aggregated studies.",
      error: error.message,
    });
  }
});

async function getStudiesWithParticipants() {
  const Subject = dataService.Subject;
  const Study = dataService.Study;

  try {
    const studiesWithParticipants = await Study.aggregate([
      {
        $lookup: {
          from: "subjects",
          localField: "name",
          foreignField: "study",
          as: "participants",
        },
      },
      {
        $project: {
          name: 1,
          startDate: 1,
          endDate: 1,
          status: 1,
          participants: {
            $map: {
              input: "$participants",
              as: "participant",
              in: "$$participant.subject",
            },
          },
        },
      },
    ]);

    return studiesWithParticipants;
  } catch (error) {
    console.error("Error aggregating studies with participants:", error);
    throw error;
  }
}

module.exports = router;
