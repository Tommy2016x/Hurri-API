const express = require('express');
const app = express();
const port = 3000;
const db = require('./src/db/index.js')
const router = require('./src/routes/user.js')
const http =  require('http');
const socket = require("socket.io");
const server = http.Server(app);
const io = socket(server);
const bodyparser = require('body-parser');

app.use((req, res, next) =>
{
    req.io = io;
    next();
})

app.use(bodyparser.urlencoded({extended: false}));

io.on("connection", socket => {
    console.log("Connected");
    socket.on("clientSend", (x) => {
        socket.broadcast.emit("clientReceive", x);
    })
});

app.use("/", router);

server.listen(port, () => {
    console.log("Server Listening on port: ", port);
})