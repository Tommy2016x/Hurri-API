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

const express = require('express')

const router = express.Router()

router.post('/user/create', createUser)
router.get('/user/get', getUser)
router.get('/message/get', getMessage)
router.post('/message/create', createMessage)

module.exports = router