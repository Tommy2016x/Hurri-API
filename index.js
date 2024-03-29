const express = require('express');
const PORT = 3000;
const db = require('./src/db/index.js')
const router = require('./src/routes/user.js')
// const http =  require('http');
const socket = require("socket.io");
// const server = http.Server(app);
//const io = socket(server);
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use((req, res, next) =>
{
    req.io = io;
    next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

let server = app.listen(PORT);

const io = require('socket.io')(server);
io.origins('*:*');

io.on("connection", socket => {
    console.log("Connected");
    socket.on("clientSend", (location) => {
        socket.broadcast.emit("clientReceive", location);
    });

    socket.on('Emergency', () => {
      socket.emit('sendLocations');
    });

    socket.on('sendMessage', (msg) => {
      socket.emit('recieveMessage', msg);
    })
});

app.use("/", router);

    console.log("Server Listening on port: ", PORT);