/* global $ */

const socket = io.connect("http://localhost:process.env.PORT");

function addRow() {
   "use strict";

    var table = document.getElementById("table");
    
    var row= document.createElement("tr");
    console.log(row);
    var td1 = document.createElement("td");
     

    td1.innerHTML = document.getElementById("item").value;
  

    row.appendChild(td1);
    

    table.children[0].appendChild(row);
};


//Socket functions
//emit
const submitAnswerBTN = $("#input").find("#submitAnswerBTN");
submitAnswerBTN.click(() => socket.emit('answerSubmited'));

//listen
socket.on('enableGame', () => {});
socket.on('problemSent', () => {});
socket.on('gamePaused', () => {});
socket.on('gameResumed', () => {});
socket.on('gameEnded', () => {});




