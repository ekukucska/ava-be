const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all patches
router.get("/", async (req, res) => {
  try {
    const patches = await dataService.Patch.find();
    res.status(200).send(patches);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a patch by ID
router.get("/:id", async (req, res) => {
  try {
    const patch = await dataService.Patch.findById(req.params.id);
    if (!patch) {
      return res.status(404).send({ message: "Patch not found" });
    }
    res.status(200).send(patch);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Create a new patch
router.post("/", async (req, res) => {
  try {
    const newPatch = new dataService.Patch(req.body);
    const createdPatch = await newPatch.save();
    res.status(201).send(createdPatch);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update a patch by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPatch = await dataService.Patch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPatch) {
      return res.status(404).send({ message: "Patch not found" });
    }
    res.status(200).send(updatedPatch);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete a patch by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPatch = await dataService.Patch.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPatch) {
      return res.status(404).send({ message: "Patch not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
