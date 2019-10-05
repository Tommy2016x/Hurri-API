const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name: String,
    body: String
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message