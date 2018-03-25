/* global $ */



function clickMe(){
                var thumbnail = calculator.screenshot({
                width: 200,
                height: 200,
                targetPixelRatio: 2
                                    });

// Append the thumbnail image to the current page
var img = document.createElement('img');
// Note: if width and height are not set, the thumbnail
// would display at 400px by 400px since it was captured
// with targetPixelRatio: 2.
img.width = 50;
img.height = 50;
img.src = thumbnail;


    var table = document.getElementById("table1");
    
    var row= document.createElement("tr");
    console.log(row);
    var td1 = document.createElement("td");
    
    
    td1.innerHTML = `<img src=${thumbnail}></img>`;

row.appendChild(td1)


    table.children[0].appendChild(row);



}






function addRow() {
   "use strict";

    var table = document.getElementById("table1");
    
    var row= document.createElement("tr");
    console.log(row);
    var td1 = document.createElement("td");

    td1.innerHTML = document.getElementById("item").value;
  

    row.appendChild(td1);
    

    table.children[0].appendChild(row);
    
    (function () {
         var script = document.createElement("script");
         script.type = "text/javascript";
         script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js?config=TeX-MML-AM_CHTML";
         document.getElementsByTagName("head")[0].appendChild(script);
    })();
    
    (function () {
         var script = document.createElement("script");
         script.type = "text/javascript";
         script.src = "mathJax.js";
         document.getElementsByTagName("head")[0].appendChild(script);
    })(); 
    
    document.getElementById("item").value = ""; //Clears the textbox when the user clicks the button
    
}


$(document).ready(function(){
    $("#addText").click(function(){
        $('#alltext').append($("#item").val());
    });
});

function addInput(){
    const element = $("#input").find('input').val();
    const output  = $("#output");
    
    output.appendChild(`<p> ${element}</p>`);
}



//Socket functions
const socket = io.connect();

//buttons and headers
const submitAnswerBTN = $("#submitAnswerBTN");
const gameState = $("#heading").find("#gameState");
//default behavior
submitAnswerBTN.prop("disabled",true);
gameState.html("Game Did Not Start Yet");

//emit
submitAnswerBTN.click(() =>{
    $("#input").find("#item").attr('value', '');
    const studentName = $("#studentInfo").find("#studentName").val();
    const studentAnswer = $("#MathOutput").html();
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
socket.on('gameResumed', () => {
    gameState.html("Playing");
    submitAnswerBTN.prop("disabled",false);
});
socket.on('gameEnded', data => {
    socket.emit("passWinnerData", data);
    window.location.replace("./leaderBoard.html");
});




