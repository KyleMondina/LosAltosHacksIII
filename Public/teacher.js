function addRow() {
   "use strict";

    var table = document.getElementById("table");
    
    var row = document.createElement("tr");
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

const student = (name,score) =>{
    let studentObj = {};
    studentObj.name = name;
    studentObj.score = score;
    return studentObj;
}



//Socket Functions
const socket = io.connect();

//buttons and headers
const createGameBTN = $('#teacherActions').find("#createGameBTN");
const submitProblemBTN = $("#submitProblemBTN");
const resumeGameBTN = $("#teacherActions").find("#resumeGameBTN");
const endGameBTN = $("#teacherActions").find("#endGameBTN");
let lbArray = [];

//emit
createGameBTN.click(() =>socket.emit('gameCreated'));
submitProblemBTN.click(() => {
    const teacherProblem = $("#output").html();
    socket.emit("problemSubmited", teacherProblem);
});
resumeGameBTN.click(() => {
    const studentName = $("#studentInfo").find("#studentName");
    const studentScore = $("#studentInfo").find("#studentScore");
    const studentWork = $("#studentInfo").find("#studentWork");
    
    const studentObj = student(studentName.text(),studentScore.val());
    lbArray.push(studentObj);
    
    studentName.html("");
    studentScore.val("");
    studentWork.html("");
    
    
    socket.emit("resumeGame")
    
});

endGameBTN.click(() => {
    socket.emit("endGame", lbArray)
});

//listen
socket.on('answerSent', data => {
    const studentWork = $("#studentInfo").find("#studentWork");
    const studentName = $("#studentInfo").find("#studentName");
    studentWork.html(data.studentAnswer);
    studentName.html(data.studentName);
    socket.emit("pauseGame");
});