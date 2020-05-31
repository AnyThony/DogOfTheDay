const express = require('express');
const mongoose = require('mongoose');
const app = express();
const vote = require("../models/vote.js")
const dailyContent = require("../models/dailyContent.js")

// GET: This call retrieves the daily content and their votes
app.get('/getMedia', (req, res, next) => {
    dailyContent.find({}, async function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ success: false, 
                message: "Internal DB Error" 
            });
            return;
        }
        res.send(data)
    })
})

// GET: This call retrieves vote made by user (if exists)
app.get('/vote', (req, res, next) => {
    let clientAddress = req.ip
    vote.find({ip: clientAddress}, async function (err, record){
        if (err) {
            console.log(err);
            res.status(500).send({ 
                success: false, 
                message: "Internal DB Error" 
            });
            return;
        }
        res.send({ 
            success: true, 
            data: record
        });
    });
})

// POST: This call submits a vote to be recorded
app.post('/vote', (req, res, next) => {
    let clientAddress = req.ip
    vote.find({ ip: clientAddress}, async function (err, record) {
        console.log(req.body)
        if (err) {
            console.log(err);
            res.status(500).send({ 
                success: false, 
                message: "Internal DB Error" 
            });
            return;
        }
        if (record.length == 0) {
            await vote.create({
                ip: clientAddress,
                media_id: req.body.media_id
            });
            await dailyContent.findOneAndUpdate({ _id: req.body.media_id }, { $inc: { votes: 1 } });
            res.send({ success: true })
        }
        else { //user has already voted
            res.status(403).send({ 
                success: false, 
                message: "Voting record already exists"
            });
        }
    })
})

// DELETE: This call removes a vote
app.delete('/vote', (req, res, next) => {
    let clientAddress = req.ip
    vote.deleteMany({ip: clientAddress}, async (err, record) => {
        if (err) {
            console.log(err);
            res.status(500).send({ 
                success: false, 
                message: "Internal DB Error" 
            });
            return;
        }
        await dailyContent.findOneAndUpdate({ _id: record.media_id }, { $inc: { votes: -1 } });
        res.send({ success: true })
    });
})

module.exports = app;