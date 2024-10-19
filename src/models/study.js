const mongoose = require("mongoose");

const studySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  participants: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["validated", "not validated"],
    required: true,
  },
});

module.exports = mongoose.model("Study", studySchema);
