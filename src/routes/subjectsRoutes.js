const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await dataService.Subject.find();
    res.status(200).send(subjects);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a subject by ID
router.get("/:id", async (req, res) => {
  try {
    const subject = await dataService.Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).send({ message: "Subject not found" });
    }
    res.status(200).send(subject);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Create a new subject
router.post("/", async (req, res) => {
  try {
    const newSubject = new dataService.Subject(req.body);
    const createdSubject = await newSubject.save();
    res.status(201).send(createdSubject);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update a subject by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSubject = await dataService.Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSubject) {
      return res.status(404).send({ message: "Subject not found" });
    }
    res.status(200).send(updatedSubject);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete a subject by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSubject = await dataService.Subject.findByIdAndDelete(
      req.params.id
    );
    if (!deletedSubject) {
      return res.status(404).send({ message: "Subject not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
