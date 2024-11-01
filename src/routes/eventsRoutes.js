const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await dataService.Event.find(); // Assuming Event is exported from dataService
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get an event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await dataService.Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Create a new event
router.post("/", async (req, res) => {
  try {
    const newEvent = new dataService.Event(req.body);
    const createdEvent = await newEvent.save();
    res.status(201).send(createdEvent);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update an event by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await dataService.Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }
    res.status(200).send(updatedEvent);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete an event by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await dataService.Event.findByIdAndDelete(
      req.params.id
    );
    if (!deletedEvent) {
      return res.status(404).send({ message: "Event not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
