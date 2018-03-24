/* global $ */




//Socket Functions
const socket = io.connect("http://localhost:process.env.PORT");

//emit
const createGameBTN = $('#teacherActions').find("#createGameBTN");
createGameBTN.click(() =>socket.emit('gameCreated'));

const submitProblemBTN = $("#teacherActions").find("#submitProblemBTN");
submitProblemBTN.click(() => socket.emit("problemSubmited"));

//listen


