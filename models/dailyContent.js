const mongoose = require('mongoose');

module.exports = mongoose.model("daily_content", {
    img_source: String,
    votes: Number
})
