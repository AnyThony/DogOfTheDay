const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cron = require("node-cron");

let refreshContentJob = require("./tasks/refreshContent.js");
//Enable CORS for client
app.use(function (req, res, next){
  res.setHeader('Access-Control-Allow-Origin',  "http://localhost:3000");
  next();
})
app.use("/api", require("./routes/api.js"));

const port = 80;
app.listen(port, () => `Server running on port ${port}`);



async function connectDB() {
  await mongoose.connect('mongodb://localhost:27017/DogOfTheDay', 
  { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
  });
  console.log("Connected to DB")
  refreshContentJob();
  cron.schedule("0 8 * * *", function() {
    refreshContentJob();
    console.log("Ran refresh job")
  });
}

connectDB();