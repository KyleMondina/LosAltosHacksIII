const LOCAL = 'http://localhost:4000';
let lbArray = [];



<<<<<<< HEAD
const socket = io.connect(LOCAL);
=======
const socket = io.connect();
>>>>>>> 82535ce8dd3c80165b6698d86f93d764eefe253b
socket.on('dataToLB', data => {
  const arrayData = data.slice();
  sort(arrayData);
  lbArray = arrayData
  console.log(lbArray);
});
//socket.on('gameResumed', data => alert(data));

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
