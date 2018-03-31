const LOCAL = 'http://localhost:4000';
let nameOfStudent = "";

function clickMe(){
  let thumbnail = calculator.screenshot({
    width: 200,
    height: 200,
    targetPixelRatio: 2
  });
  let img = document.createElement('img');
  img.width = 50;
  img.height = 50;
  img.src = thumbnail;
  let table = $("#output").find("#studentProblem").find("#table")
  let row= document.createElement("tr");
  console.log(row);
  let td1 = document.createElement("td");

  td1.innerHTML = `<img src=${thumbnail}></img>`;
  row.appendChild(td1)
  table.append(row);
}

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
const socket = io.connect();

//buttons and headers
const createGameBTN = $('#teacherActions').find("#createGameBTN");
const submitProblemBTN = $("#output").find("#submitProblemBTN");
const resumeGameBTN = $("#studentInfo").find("#resumeGameBTN");
const endGameBTN = $("#teacherActions").find("#endGameBTN");
let lbArray = [];

//emit
createGameBTN.click(() =>{
  socket.emit('gameCreated')
  createGameBTN.css("background-color","gray")
});
submitProblemBTN.click(() => {
    const teacherProblem = $("#output").find("#studentProblem").html();
    socket.emit("problemSubmited", teacherProblem);
});
resumeGameBTN.click(() => {
    const studentName = $("#studentInfo").find("#studentName");
    const studentScore = $("#studentInfo").find("#studentScore");
    const studentWork = $("#studentInfo").find("#studentWork");

    nameOfStudent = studentName.text();
    const studentObj = student(nameOfStudent,studentScore.val());
    lbArray.push(studentObj);

    studentName.html("Student Name: ");
    studentScore.val("");
    studentWork.html("");
    nameOfStudent = "";

    socket.emit("resumeGame", lbArray);
});

endGameBTN.click(() => {
  /*const studentName = $("#studentInfo").find("#studentName");
  const studentScore = $("#studentInfo").find("#studentScore");
  const studentWork = $("#studentInfo").find("#studentWork");
  const studentObj = student(studentName.text().slice(

  ),studentScore.val());
  lbArray.push(studentObj);*/

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
