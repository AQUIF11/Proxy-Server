const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const indexRoutes = require("./routes/index");

const app = express();

// IMPLEMENT RATE-LIMITING
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // TIME DURATION IN MILLISECS(HERE 10 MINS)
  max: 5, // MAX NUMBER OF REQUESTS IN THE SPECIFIED TIME DURATION
});
app.use(limiter);
// ALSO SINCE THIS IS A PROXY-SERVER
app.set("trust proxy", 1);

// SET STATIC FOLDER
app.use(express.static("public"));

// ROUTES
app.use("/api", indexRoutes);

// ENABLE CORS
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
