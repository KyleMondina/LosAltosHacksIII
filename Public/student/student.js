const LOCAL = 'http://localhost:4000';

function clickMe(){

    let thumbnail = calculator1.screenshot({
      width: 200,
      height: 200,
      targetPixelRatio: 2
    });
    // Append the thumbnail image to the current page
    let img = document.createElement('img');
    // Note: if width and height are not set, the thumbnail
    // would display at 400px by 400px since it was captured
    // with targetPixelRatio: 2.
    img.width = 50;
    img.height = 50;
    img.src = thumbnail;

    let table = $("#MathOutput").find("#studentAnswer").find("#table1")
    let row= document.createElement("tr");
    console.log(row);
    let td1 = document.createElement("td");

    td1.innerHTML = `<img src=${thumbnail}></img>`;
    row.appendChild(td1)
    table.append(row);
}


function addRow() {
   "use strict";
    let table = $("#MathOutput").find("#table1");

    let row= document.createElement("tr");
    console.log(row);
    let td1 = document.createElement("td");
    td1.innerHTML = document.getElementById("item").value;

    row.appendChild(td1);
    table.append(row);

    setTimeout(function () {
         var script = document.createElement("script");
         script.type = "text/javascript";
         script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-MML-AM_CHTML";
         document.getElementsByTagName("head")[0].appendChild(script);
    }, 70);

    setTimeout(function () {
         var script = document.createElement("script");
         script.type = "text/javascript";
         script.src = "../mathJax.js";
         document.getElementsByTagName("head")[0].appendChild(script);
    }, 100);

    document.getElementById("item").value = ""; //Clears the textbox when the user clicks the button

}


//Socket functions
const socket = io.connect();

//buttons and headers
const submitAnswerBTN = $("#MathOutput").find("#submitAnswerBTN");
const gameState = $("#heading").find("#gameState");
//default behavior
submitAnswerBTN.prop("disabled",true);
gameState.html("Game Did Not Start Yet");

//emit
submitAnswerBTN.click(() =>{
    const studentName = $("#studentInfo").find("#studentName").val();
    const studentAnswer = $("#MathOutput").find("#studentAnswer").html();
    socket.emit('answerSubmited', {studentAnswer,studentName});
});

//listen

socket.on('enableGame', () => {
    gameState.html("Game Started");
    submitAnswerBTN.prop("disabled",false);
});
socket.on('problemSent', data => {
    const problem = $("#problem");
    problem.html(data);
});
socket.on('gamePaused', () => {
    gameState.html("Game Paused");
    submitAnswerBTN.prop("disabled",true);
});
socket.on('gameResumed', data => {
    gameState.html("Playing");
    submitAnswerBTN.prop("disabled",false);
});
socket.on('gameEnded', () => {
    window.location.replace("../leaderBoard/leaderBoard.html");
});
