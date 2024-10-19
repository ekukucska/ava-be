const express = require("express");
require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/index");

const app = express();
// Use the PORT environment variable or default to 5000
const port = process.env.PORT || 5000;

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

// Use the routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
