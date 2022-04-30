const express = require("express");
const app = express(); // create express app
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

//is this needed
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const router = require("./routes/router");
app.use("/", router);

//is this needed(index.html in the build folder)
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 3000
app.listen(port, () => {
  console.log("server started on port 3000");
});
