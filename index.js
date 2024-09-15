// Import the necessary modules
require("dotenv").config();
const express = require("express");
const app = express();

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
