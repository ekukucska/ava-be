const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  study: {
    type: String,
    required: true,
  },
  subject: {
    type: String, // e.g., SB-001
    required: true,
  },
  subjectData: {
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: false, // height can be optional
    },
    BMI: {
      type: Number,
      required: true,
    },
  },
  anomalies: [
    {
      anomalyType: {
        type: String,
        enum: [
          "Perm. drift",
          "Low sensitivity",
          "Drawn attached",
          "Drawn detached",
          "Noise",
          "Init. suppression",
          "Temp. low sensitivity",
          "Dropout",
          "Run-in",
          "Error",
          "Suppression",
        ],
        required: true,
      },
      startDateTime: {
        type: String, // storing datetime as a string
        required: true,
      },
      endDateTime: {
        type: String, // storing datetime as a string
        required: true,
      },
    },
  ],
  events: [
    {
      eventType: {
        type: String, // e.g., 'sleep'
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
        required: true,
      },
      startDateTime: {
        type: String, // storing datetime as a string
        required: true,
      },
      endDateTime: {
        type: String, // storing datetime as a string
        required: true,
      },
    },
  ],
  sensorData: {
    type: {
      type: String, // all should be 'cgm'
      required: true,
    },
    dateTime: {
      type: [String], // storing datetime as a string
      required: true,
    },
    values: {
      type: [Number], // same number of items as the dateTime array
      required: true,
    },
  },
});

module.exports =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
