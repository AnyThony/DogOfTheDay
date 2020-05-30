/*
* This is a cron job scheduled daily to refresh content
*/
const fetch = require('node-fetch');
const voteEntrie = require("../models/voteEntry.js")
const dailyContent = require("../models/dailyContent.js")
const config = require("../config.js")

async function refreshContent(){
    //need to clear the existing content in DB
    if (config.contentKey == "API_KEY_HERE"){
        console.warn("API_KEY_NOT_SET: config.js needs a tenor API key!")
    }
    await dailyContent.deleteMany({})
    var newContent = await fetch(`https://api.tenor.com/v1/search?q=${config.contentKeyword}&key=${config.tenorKey}&limit=${config.contentLimit}`)
    .then(res => res.json())

    newContent = newContent.results.map(res => ({
        img_source: res.media[0].gif.url,
        votes: 0
    }))
    await dailyContent.insertMany(newContent)
}

module.exports = refreshContent