const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all studies
router.get("/", async (req, res) => {
  try {
    const studies = await dataService.Study.find();
    res.status(200).send(studies);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a study by ID
router.get("/:id", async (req, res) => {
  try {
    const study = await dataService.Study.findById(req.params.id);
    if (!study) {
      return res.status(404).send({ message: "Study not found" });
    }
    res.status(200).send(study);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Create a new study
router.post("/", async (req, res) => {
  try {
    const newStudy = new dataService.Study(req.body);
    const createdStudy = await newStudy.save();
    res.status(201).send(createdStudy);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update a study by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedStudy = await dataService.Study.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudy) {
      return res.status(404).send({ message: "Study not found" });
    }
    res.status(200).send(updatedStudy);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete a study by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudy = await dataService.Study.findByIdAndDelete(
      req.params.id
    );
    if (!deletedStudy) {
      return res.status(404).send({ message: "Study not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
