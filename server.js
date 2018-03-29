const express = require('express');
const app = express();
const routes = require('./routes.js');
const socket = require('socket.io');
const path = require('path');

const server = app.listen(process.env.PORT || 4000);
const io = socket(server);


app.use(routes);
app.use(express.static(path.join(__dirname, '/Public')));
app.use("/Public",express.static(path.join(__dirname, '/Public')));

let winnerData = [];
io.on('connection', socket => {
    console.log('made socket connection');

    socket.on('gameCreated', () => io.sockets.emit('enableGame'));
    socket.on('problemSubmited', data => {
        console.log("a teacher has submitted a data:" + data);
        io.sockets.emit('problemSent', data)
    });
    socket.on('answerSubmited', data => {
        console.log(data.studentName + "has submitted a work");
        io.sockets.emit('answerSent', data);

    });
    socket.on('pauseGame', () => io.sockets.emit('gamePaused'));
    socket.on('resumeGame', data => io.sockets.emit('gameResumed', data));

    socket.on('endGame', data => {
      console.log('Game Ended');
      console.log(data);
      io.sockets.emit('gameEnded');
      winnerData = data;
    });
    socket.on('leaderBoardLoaded', () => {
      console.log("data to be sent to leaderBoard:" + winnerData);
      io.sockets.emit('winnerDataSent', winnerData);
      winnerData = [];
    });

});
