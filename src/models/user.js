const mongoose  = require('mongoose')

items = [{itemName: 'water', bought: false},
{itemName: 'beans', bought: false},
{itemName: 'rice', bought: false},
{itemName: 'corn', bought: false},
{itemName: 'tuna', bought: false }
];
const userSchema = new mongoose.Schema({
    lat: {type: Number, default: null},
    lng: {type: Number, default: null},
    name: {type: String, required: true},
    score: {type: Number, default: 0},
    itemsbought: {type: [{ itemName: String, bought: Boolean}], default: items },
    permissionloc: {type: Boolean, default: false},
    emergency: {type: Boolean, default: false}
});

const User = mongoose.model("User", userSchema);

module.exports = User