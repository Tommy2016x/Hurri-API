const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./src/db/index.js')
const router = require('./src/routes/user.js')
const http =  require('http');
const socket = require("socket.io");
const server = http.Server(app);
const io = socket(server);
const bodyParser = require('body-parser');
const cors = require(cors());

app.use((req, res, next) =>
{
    req.io = io;
    next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

io.on("connection", socket => {
    console.log("Connected");
    socket.on("clientSend", (x) => {
        socket.broadcast.emit("clientReceive", x);
    })
});

app.use("/", router);

server.listen(PORT, () => {
    console.log("Server Listening on port: ", PORT);
})