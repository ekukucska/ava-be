const mongoose = require("mongoose");

const anomalySchema = new mongoose.Schema({
  study: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  types: [
    {
      anomalyType: {
        type: String,
        required: true,
      },
      startDateTime: {
        type: Date,
        required: true,
      },
      endDateTime: {
        type: Date,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Anomaly", anomalySchema);
