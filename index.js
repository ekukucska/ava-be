// Import the necessary modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

// Use the PORT environment variable or default to 5000
const port = process.env.PORT || 5000;

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!!!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
