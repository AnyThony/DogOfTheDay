const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use("/api", require("./routes/api.js"))

const port = 80;
//app.use(express.static(__dirname + '/client/public'));
app.listen(port, () => `Server running on port ${port}`);

mongoose.connect('mongodb://localhost:27017/DogOfTheDay');