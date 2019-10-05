const User = require('../models/user')
const createUser = async (req, res) => {
    try{
        const { name } = req.body

        const fields = {
            name
        };
        const user = await User.create(fields);
        console.log(fields.name, "has been created");
        return res.send("success");
    
    }catch(e){
        console.log(e.toString)
        return res.send(e.toString());
    }

}

const getUsers = async (req, res) => {
    try{
        const users = await User.find({});
        return res.send(users.toString());
    }catch(e){
        return res.send(e.toString());
    }
}

const createMessage = async (req,res) => {
    try{
        const {name, body} = req.body;

        fields = {name, body};

        const Message =  await Message.create(fields);

        return res.send("success");
    }catch(e){
        return res.send(e.toString());
    }
}

const getMessage = async (req, res) => {
    try{
        const messages = await Message.find({});
        return res.send(messages);
    }catch(e){
        return res.send(e.toString());
    }
}

const updateUserLocation = async (req, res) => {
    try{
        const {lat,lng,name} = req.body;
        
        const user = await User.findOneAndUpdate({name}, {lat, lng}, {new: true}).exec();

        return res.send(user.toString());
    }catch(e){
        return res.send(e.toString());
    }
}

const setEmergency = async (req, res) => {
  try{
    const users = await User.find({});

    users.forEach(async user => {
      const { name } = user;
      const { emergency: curEmergency } = user;

      await User.findOneAndUpdate({name}, {emergency: !curEmergency});
    });

    res.send('success');

  } catch (e) {
    console.log(e);
    res.send(e.toString());
  }
}

const updateScore = async (req, res) => {
    try{
        const {name, items} = req.body;
        console.log(items);

        let user = await User.findOne({name});

        let { itemsbought, score } = user;
        console.log(itemsbought);
        
        items.forEach(item => {
            itemsbought.forEach(userItem => {
              const { itemName }= userItem;

              if(itemName === item){
                Object.assign(userItem, {bought: true});
              }
            });
        });

        score = 0;

        itemsbought.forEach(item => {
          const { bought } = item;

          if(bought){
            score++;
          }

        });

        const updated = await User.findOneAndUpdate({name}, {itemsbought, score}, { new: true }).exec();

        return res.send(updated.toString());

        
    }catch(e){
        return res.send(e.toString());
    }
}

const readUser = async (req, res) => {
    try{
        const name = req.body

        const user = await User.findOne({name});

        return res.send(user.toString());
    }catch(e){
        return res.send(e.toString());
    }
}

const leaderboard = async (req,res) => {
    try{
        let users = await User.find({});

        await users.sort((x,y) => { return y.score - x.score });

        return res.send(users);
    }catch(e){
        return res.send(e.toString());
    }
}


const express = require('express')

const router = express.Router()

router.get('/', () => {res.send("Welcome to Hurri-API")});
router.post('/user', createUser)
router.get('/user', getUsers)
router.get('/user/read', readUser)
router.get('/message', getMessage)
router.post('/message', createMessage)
router.put('/user/location', updateUserLocation)
router.put('/user/score', updateScore)
router.put('/user/emergency', setEmergency);
router.get('/user/leaderboard', leaderboard)

module.exports = router