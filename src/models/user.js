const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    location: {lat: {type: String, required:true}, lng: {type:String, required:true}},
    name: {type: String, required: true},
    score: {type: Number, default: 0},
    itemsbought: [String],
    permissionloc: {type: Boolean, default: false},
    emergency: {type: Boolean, default: false}
});

const User = mongoose.model("User", userSchema);

module.exports = User