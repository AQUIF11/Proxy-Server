const express = require("express");
const cors = require("cors");
require("dotenv").config();

const indexRoutes = require("./routes/index");

const app = express();

app.use("/api", indexRoutes);

// ENABLE CORS
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
