const express = require('express');
const app = express();
const routes = require('./routes.js');
const socket = require('socket.io');
const path = require('path');

const server = app.listen(process.env.PORT);
const io = socket(server);

app.use('/Public', express.static(path.join(__dirname, 'Public')));
app.use(routes);



io.on('connection', socket => {
    console.log('made socket connection');
    
    socket.on('gameCreated', () => io.sockets.emit('enableGame'));
    socket.on('problemSubmited', data => io.sockets.emit('problemSent', data));
    socket.on('answerSubmited', data => io.sockets.emit('answerSent', data));
    socket.on('pauseGame', () => io.sockets.emit('gamePaused'));
    socket.on('resumeGame', () => io.sockets.emit('gameResumed'));
    socket.on('endGame', data => io.sockets.emit('gameEnded', data));
    
});

