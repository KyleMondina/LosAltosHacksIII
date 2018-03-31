const LOCAL = 'http://localhost:4000';
let lbArray = [];

const socket = io.connect();
socket.emit('leaderBoardLoaded');
socket.on('winnerDataSent', data => lbArray = data);



function clickMe(){
  var nestedArray=lbArray;


  nestedArray.sort(function(a, b){ return b.score - a.score });

  var leaderBoard = "<table>";
leaderBoard+="<th>Name</th>";
leaderBoard+="<th>Score</th>";

  for (var i = 0; i < nestedArray.length; i++) {
      leaderBoard+="<tr>";
      leaderBoard+="<td>"+nestedArray[i].name+"</td>";
      leaderBoard+="<td>"+nestedArray[i].score+"</td>";


      leaderBoard+="</tr>";

  }
  leaderBoard+="</table>";


document.getElementById("leaderBoardBox").innerHTML = leaderBoard;
}


 function check(){
     alert(lbArray);
 }
