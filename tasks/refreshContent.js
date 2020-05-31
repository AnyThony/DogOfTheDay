/*
* This is a cron job scheduled daily to refresh content
*/
const fetch = require('node-fetch');
const vote = require("../models/vote.js")
const dailyContent = require("../models/dailyContent.js")
const config = require("../config.js")

let apiKey = process.env.TENOR_KEY || config.tenorKey;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function refreshContent(){
    if (config.contentKey == "API_KEY_HERE"){
        console.warn("API_KEY_NOT_SET: config.js needs a tenor API key!")
    }

    var newContent = await fetch(`https://api.tenor.com/v1/search?q=${config.contentKeyword}&key=${apiKey}&limit=${config.contentLimit}`)
    .then(res => res.json())

    newContent = newContent.results.map(res => ({
        img_source: res.media[0].gif.url,
        votes: config.enableFakeVotes ? getRandomInt(8) : 0
    }))
    //need to clear the existing content in DB
    await dailyContent.deleteMany({})
    await vote.deleteMany({})
    //insert new content
    await dailyContent.insertMany(newContent)
}

module.exports = refreshContent