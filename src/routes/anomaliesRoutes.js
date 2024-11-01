const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all anomalies
router.get("/", async (req, res) => {
  try {
    const anomalies = await dataService.Anomaly.find();
    res.status(200).send(anomalies);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get an anomaly by ID
router.get("/:id", async (req, res) => {
  try {
    const anomaly = await dataService.Anomaly.findById(req.params.id);
    if (!anomaly) {
      return res.status(404).send({ message: "Anomaly not found" });
    }
    res.status(200).send(anomaly);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Create a new anomaly
router.post("/", async (req, res) => {
  try {
    const newAnomaly = new dataService.Anomaly(req.body);
    const createdAnomaly = await newAnomaly.save();
    res.status(201).send(createdAnomaly);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update an anomaly by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedAnomaly = await dataService.Anomaly.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAnomaly) {
      return res.status(404).send({ message: "Anomaly not found" });
    }
    res.status(200).send(updatedAnomaly);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete an anomaly by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAnomaly = await dataService.Anomaly.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAnomaly) {
      return res.status(404).send({ message: "Anomaly not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
