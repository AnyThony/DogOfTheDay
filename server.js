const express = require('express');
const mongoose = require('mongoose');
const config = require("./config.js")
const path = require("path")
const app = express();
const cron = require("node-cron");
var cors = require('cors');
let refreshContentJob = require("./tasks/refreshContent.js");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//Enable CORS for client
app.use(cors());
app.use("/api", require("./routes/api.js"));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const port = 80;
app.listen(port, () => `Server running on port ${port}`);

async function connectDB() {
  
  await mongoose.connect(config.mongoConnection, 
  { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
  });
  console.log("Connected to DB")
  refreshContentJob();
  console.log("Refreshed content")
  cron.schedule("0 8 * * *", function() {
    refreshContentJob();
    console.log("Ran refresh job")
  });
}

connectDB();