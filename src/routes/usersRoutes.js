const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await dataService.User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await dataService.User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = new dataService.User(req.body);
    const createdUser = await newUser.save();
    res.status(201).send(createdUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await dataService.User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await dataService.User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
