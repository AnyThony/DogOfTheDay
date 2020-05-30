const mongoose = require('mongoose');

module.exports = mongoose.model("vote_entrie", {
    ip: String,
    media_id: String,
    active: Boolean
})
