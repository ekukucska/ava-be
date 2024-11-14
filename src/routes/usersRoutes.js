const express = require("express");
const bodyParser = require("body-parser");
const dataService = require("../models/dataService.js");
const router = express.Router();
const noCacheMiddleware = require("../middleware/caching/noCacheMiddleware.js");

// Use body-parser middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Apply no-cache middleware for all user routes
router.use(noCacheMiddleware);

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await dataService.User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get a single user by email
router.get("/by-email/:email", async (req, res) => {
  try {
    const user = await dataService.User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Create a new user with email and password (firstName and lastName optional)
router.post("/create", async (req, res) => {
  try {
    const { email, password, firstName = "", lastName = "" } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await dataService.User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    // Create new user with optional fields defaulting to empty strings
    const newUser = new dataService.User({
      email,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
    });

    const createdUser = await newUser.save();
    res.status(201).send(createdUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update user names by email
router.patch("/update-names-by-email", async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    // Validate required fields
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!firstName && !lastName) {
      return res.status(400).send({
        message: "At least one name field (firstName or lastName) is required",
      });
    }

    // Create update object with only the provided fields
    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;

    // Find and update the user by email
    const updatedUser = await dataService.User.findOneAndUpdate(
      { email: email },
      { $set: updateFields },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ message: "User not found with the provided email" });
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete user by email
router.delete("/delete-by-email", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email is provided
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }

    // Find and delete the user
    const deletedUser = await dataService.User.findOneAndDelete({ email });

    if (!deletedUser) {
      return res
        .status(404)
        .send({ message: "User not found with the provided email" });
    }

    res.status(200).send({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
