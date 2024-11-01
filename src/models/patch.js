const mongoose = require("mongoose");

const patchSchema = new mongoose.Schema({
  study: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  dateTime: {
    type: [Date],
    required: true,
  },
  values: {
    type: [Number],
    required: true,
  },
});

module.exports = mongoose.model("Patch", patchSchema);
