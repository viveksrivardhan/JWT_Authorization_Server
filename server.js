// whatever the env we store in file, the dotenv will take all parameters from the file, secret key will be stored in dotenv and also we can store mongo db url
require("dotenv").config();
const express = require("express");
const mongo = require("mongoose");
const app = express();

// to accept json data 
app.use(express.json());

// no need to specify the port in listen we can do as below,
// the process.env.Port says to take a port that is defined in environment, if there is no port defined then take 5000
const Port = process.env.PORT || 3000;

mongo.connect(process.env.MONGO_URL, function (err) {
  if (err) {
    console.log("Not able to connect to Mongo DB");
  } else {
    console.log("Connection Successful to MongoDB");
  }
});

//use the router from routes
const AuthRouter = require("./routes/AuthRouter");
app.use("/auth", AuthRouter);

app.listen(Port, () => {
  console.log(`Server is running ${Port}`);
});
