const express = require("express");
const app = express();
const port = 8000;
const passport = require("passport");
const db = require("./config/mongoose");
const passportJWT = require("./config/passport-jwt-strategy");

//for decoding form data
app.use(express.urlencoded());

//static files
app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));

//passport initialisation
app.use(passport.initialize());

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server ${err}`);
  }
  console.log(`Server started on port : ${port}`);
});
