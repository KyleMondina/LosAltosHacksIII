const LOCAL = 'http://localhost:4000';

function addRow() {
   "use strict";

    let table = $("#output").find("#studentProblem").find("#table");
    let row = document.createElement("tr");
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

const student = (name,score) =>{
    let studentObj = {};
    studentObj.name = name;
    studentObj.score = score;
    return studentObj;
}

//Socket Functions
const socket = io.connect(LOCAL);

//buttons and headers
const createGameBTN = $('#teacherActions').find("#createGameBTN");
const submitProblemBTN = $("#output").find("#submitProblemBTN");
const resumeGameBTN = $("#studentInfo").find("#resumeGameBTN");
const endGameBTN = $("#teacherActions").find("#endGameBTN");
let lbArray = [];

//emit
createGameBTN.click(() =>socket.emit('gameCreated'));
submitProblemBTN.click(() => {
    const teacherProblem = $("#output").find("#studentProblem").html();
    socket.emit("problemSubmited", teacherProblem);
});
resumeGameBTN.click(() => {
    const studentName = $("#studentInfo").find("#studentName");
    const studentScore = $("#studentInfo").find("#studentScore");
    const studentWork = $("#studentInfo").find("#studentWork");

    const studentObj = student(studentName.text(),studentScore.val());
    lbArray.push(studentObj);

    studentName.html("Student Name: ");
    studentScore.val("");
    studentWork.html("");

    socket.emit("resumeGame", lbArray);
});

endGameBTN.click(() => {
  const studentName = $("#studentInfo").find("#studentName");
  const studentScore = $("#studentInfo").find("#studentScore");
  const studentWork = $("#studentInfo").find("#studentWork");
  const studentObj = student(studentName.text().slice(14),studentScore.val());
  lbArray.push(studentObj);

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
