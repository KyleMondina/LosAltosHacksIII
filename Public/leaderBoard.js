const LOCAL = 'http://localhost:4000';
let lbArray = [];



const socket = io.connect();
$(document).ready(() => socket.emit('leaderBoardLoaded'));
socket.on('winnerDataSent', data => lbArray = data);



function clickMe(){
   // var nestedArray=[{name:"Bob", score:3}, {name: "Sally", score:5}];
  var nestedArray=lbArray;
//    document.writeln("<table border= '0' width = '100%'>");
  /*  var table = document.getElementById("table1");

    for (var i = 0; i < nestedArray.length; i++) {

    var row= document.createElement("tr");
    console.log(row);
    var td1 = document.createElement("td");

    td1.innerHTML = nestedArray[i].name;

        var td2 = document.createElement("td");
        td2.innerHTML = nestedArray[i].score;
    row.appendChild(td1, td2);

    }
    */

    for (var i = 0; i < nestedArray.length; i++) {
        document.writeln("<tr>");
        document.writeln("<td>");
         document.writeln(nestedArray[i].name);
        document.writeln(nestedArray[i].score) + "<br>";
        document.writeln("</td>");
        document.writeln("</tr>");
    }
 }

 function check(){
     alert(lbArray);
 }

function sort(array){
  for (let i = 0; i<array.length; i++){
    let max = i;
    for (let j=i+1;j<array.length;j++){
      if (array[j].score > array[max].score) max = j;
    }
    if (i != max){
      let temp = array[i]
      array[i] = array[max]
      array[max] = temp;
    }
  }
};



//socket commands
