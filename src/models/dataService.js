const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./user.js");
const Study = require("./study.js");
const Subject = require("./subject.js");
const Patch = require("./patch.js");
const Event = require("./event.js");
const Anomaly = require("./anomaly.js");

class MongoService {
  constructor() {
    console.log("Creating connection");
    mongoose
      .connect(`${process.env.DB_CONNECTION_STRING}${process.env.DB_NAME}`, {
        useNewUrlParser: true, // Added for better connection handling
        useUnifiedTopology: true, // Added for better connection handling
      })
      .then(() => {
        console.log("Connected to database");
      })
      .catch((error) => {
        console.error("Database connection error:", error); // Added error handling
      });

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB"); // Added connection event listener
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err); // Added error event listener
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from DB"); // Added disconnection event listener
    });
  }

  get User() {
    return User;
  }

  get Study() {
    return Study;
  }

  get Subject() {
    return Subject;
  }

  get Patch() {
    return Patch;
  }

  get Event() {
    return Event;
  }

  get Anomaly() {
    return Anomaly;
  }
}

module.exports = new MongoService();
