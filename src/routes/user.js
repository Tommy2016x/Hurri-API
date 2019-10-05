const User = require('../models/user')
const createUser = async (req, res) => {
    try{
        const location = {
            lat: req.body,
            lng: req.body
        };
        const {name, score, itemsbought, permissionloc, emergency} = req.body
        const fields = {
            name,
            score,
            itemsbought,
            permissionloc,
            emergency,
            location
        };
        const user = await User.create(fields);
        console.log(fields.name, "has been created");
        return res.send("success");
        
    
    }catch(e){
        console.log(e.toString)
        return res.send(error, e.toString());
    }

}

const getUser = async (req, res) => {
    try{
        const users = await User.find({});
        return res.send(users);
    }catch(e){
        return res.send(error, e.toString());
    }
}

const createMessage = async (req,res) => {
    try{
        const {name, body} = req.body;

        fields = {name, body};

        const Message =  await Message.create(fields);

        return res.send("success");
    }catch(e){
        return res.send(error, e.toString());
    }
}

const getMessage = async (req, res) => {
    try{
        const messages = await Message.find({});
        return res.send(messages);
    }catch(e){
        return res.send(error, e.toString());
    }
}

const updateUser = async (req, res) => {
    try{
        const {location:{lat, lng}, name} = req.body;
        
        const user = User.findOneAndUpdate({name}, {location}, {new: true});

        return res.send(user);
    }catch(e){
        return res.send(e.toString());
    }
}

const updateScore = async (req, res) => {
    try{
        const {name, items} = req.body;

        let user = User.findOne({name});
        let counter = 0;
        
        items.forEach(item => {
            user.itemsbought.push(item);
            counter++;
        });

        user.score += counter;

        const updated = User.findOneAndUpdate({name}, {user});

        return res.send(updated);

        
    }catch(e){
        return res.send(e.toString());
    }
}

const readUser = (req, res) => {
    try{
        const name = req.body

        const user = User.findOne({name});

        return res.send(user);
    }catch(e){
        return res.send(e);
    }
}
const express = require('express')

const router = express.Router()

router.get('/', () => {res.send("Welcome to Hurri-API")});
router.post('/user/create', createUser)
router.get('/user/get', getUser)
router.get('/message/get', getMessage)
router.post('/message/create', createMessage)
router.put('/user/location', updateUser)
router.put('/user/score', updateScore)

module.exports = router