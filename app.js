const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
require("dotenv/config");

const app = express();
app.use(bodyParser.json());

var hackerEarth = require("hackerearth-node"); //require the Library
//Now set your application
var hackerEarth = new hackerEarth("ab4764539e36d503118d8ba1720cf7ec547c82d0");

// Import routes

const questionsRoute = require("./routes/questions");

app.use("/questions", questionsRoute);

app.get("/", (req, res) => {
  res.send("We are on home");
});

app.post("/compile", async (req, res) => {
  const { source, lang } = req.body;
  var config = {};
  config.time_limit = 1; //your time limit in integer
  config.memory_limit = 323244; //your memory limit in integer
  config.source = source; //your source code for which you want to use hackerEarth api
  config.input = ""; //input against which you have to test your source code
  config.language = lang; //optional choose any one of them or none

  hackerEarth.compile(config, function (err, response) {
    if (err) {
      //deal with error
      res.json({ error: err });
    } else {
      res.json({ response });
    }
  });
});

app.post("/run", async (req, res) => {
  const { source, lang } = req.body;
  var config = {};
  config.time_limit = 1; //your time limit in integer
  config.memory_limit = 323244; //your memory limit in integer
  config.source = source; //your source code for which you want to use hackerEarth api
  config.input = ""; //input against which you have to test your source code
  config.language = lang; //optional choose any one of them or none

  hackerEarth.run(config, function (err, response) {
    if (err) {
      //deal with error
      res.json({ error: err });
    } else {
      res.json({ response });
    }
  });
});

// Connect to MongoATLAS DB
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

// Listen to server

app.listen(PORT);
