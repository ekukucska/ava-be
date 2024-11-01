const mongoose = require("mongoose");

const eventTypeSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: [
      "Insulin",
      "Medication",
      "Food",
      "Alcohol",
      "Exercise",
      "Sleep",
      "Stress",
      "Pain",
      "Caffeine",
      "Smoking",
    ],
  },
  startDateTime: {
    type: [Date],
    default: [],
  },
  endDateTime: {
    type: [Date],
    default: [],
  },
});

const eventSchema = new mongoose.Schema({
  study: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  types: {
    type: [eventTypeSchema],
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
