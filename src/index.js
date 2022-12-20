require("./models/User");
require("./models/Track");
require('dotenv').config();
const cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const stationRoutes = require("./routes/stationRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(stationRoutes);

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
