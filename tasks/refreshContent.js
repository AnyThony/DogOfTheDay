/*
* This is a cron job scheduled daily to refresh content
*/
const fetch = require('node-fetch');
const voteEntrie = require("../models/voteEntry.js")
const dailyContent = require("../models/dailyContent.js")
const config = require("../config.js")

async function refreshContent(){
    //need to clear the existing content in DB
    await dailyContent.remove({})
    var newContent = await fetch(`https://api.tenor.com/v1/search?q=${config.contentKeyword}&key=${config.tenorKey}&limit=${config.contentLimit}`)
    .then(res => res.json())
    await dailyContent.insertMany(newContent)
}

module.exports = refreshContent