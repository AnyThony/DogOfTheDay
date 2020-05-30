const express = require('express');
const mongoose = require('mongoose');
const app = express();

let refreshContentJob = require("./tasks/refreshContent.js")

app.use("/api", require("./routes/api.js"))

const port = 80;
app.listen(port, () => `Server running on port ${port}`);

mongoose.connect('mongodb://localhost:27017/DogOfTheDay');