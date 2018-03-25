const express = require('express');
const app = express();
const routes = require('./routes.js');
const socket = require('socket.io');
const path = require('path');

const server = app.listen(4000);
const io = socket(server);

app.use(express.static(path.join(__dirname, 'Public')));
app.use(routes);



io.on('connection', socket => {
    console.log('made socket connection');

    socket.on('gameCreated', () => io.sockets.emit('enableGame'));
    socket.on('problemSubmited', data => {
        console.log(data);
        io.sockets.emit('problemSent', data)
    });
    socket.on('answerSubmited', data => {
        console.log(data.studentName);
        io.sockets.emit('answerSent', data);

    });
    socket.on('pauseGame', () => io.sockets.emit('gamePaused'));
    socket.on('resumeGame', data => io.sockets.emit('gameResumed', data));

    socket.on('endGame', data => {
      console.log('endGAme');
        console.log(data);
        io.sockets.emit('gameEnded', data)

    });

    socket.on('passWinnerData', data => {
      console.log('passWinnerDAta');
        console.log(data);


        io.sockets.emit('dataToLB', data);

    });

});
