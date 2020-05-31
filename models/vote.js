const mongoose = require('mongoose');

module.exports = mongoose.model("vote", {
    ip: String,
    media_id: String
})
