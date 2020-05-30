const express = require('express');
const mongoose = require('mongoose');
const app = express();
const voteEntrie = require("../models/voteEntry.js")
const dailyContent = require("../models/dailyContent.js")

app.get('/getMedia', (req, res, next) => {
    dailyContent.find({}, async function (err, data) {
        res.send(data)
    })

})

app.post('/vote', (req, res, next) => {
})

module.exports = app;