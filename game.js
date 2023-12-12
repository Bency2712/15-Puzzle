var blocks = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
var finished = false;

drawBoard();

function drawBoard() {
    for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            var block = "b" + i + j;
            if (blocks[i][j] != 0) {
                document.getElementById(block).innerHTML = blocks[i][j];
                document.getElementById(block).style.backgroundColor = "ghostwhite";
            }
	    else {
                document.getElementById(block).innerHTML = "";
                document.getElementById(block).style.backgroundColor = "black";
            }
        }
    }
}
Shuffle();
//This will keep the count of moves
var moves=0;

var startTime; // Variable to store the start time
var timerInterval=-1; // Interval for updating the timer



function startTimer() {
    startTime = Date.now(); // Record the start time when the game starts
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
}

function updateTimer() {
    var currentTime = Date.now();
    var elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    document.getElementById("timer").textContent = elapsedTime + " seconds";
}

function stopTimer() {
        clearInterval(timerInterval);
        timerInterval=-1;
    
}

function SimpleGame() {
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").innerHTML = "";
    startTimer();
    moves = 0;
    document.getElementById("Total Moves").textContent = moves;

    // Initialize the board with blocks 1 to 15
    var num = 1;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var block = "b" + i + j;
            if (num === 15) {
                blocks[i][j] = 0; // Set the empty block
                blocks[i][j+1] = 15;
                break;
            } else {
                blocks[i][j] = num;
            }
            num++;
        }
    }

    // Redraw the board
    drawBoard();
}

function Shuffle() 
{
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").innerHTML = "";
    
    startTimer();
    // mix up the array using the Fisher-Yates algorithm
    var tempArray = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    var currentIndex = tempArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex!=0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = tempArray[currentIndex];
        tempArray[currentIndex] = tempArray[randomIndex];
        tempArray[randomIndex] = temporaryValue;
    }

    // Now use your randomized indicies to repopulate the 2d array
    tempArrayIndex = 0;
    for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            blocks[i][j] = tempArray[tempArrayIndex];
            tempArrayIndex++;
        }
    }

    // redraw the game board
    drawBoard();
    // set finished = false
    if (finished == true) {
       finished = false;
    }
}
/*
function swapBlocks(oldX,oldy,newX,newY) {
   var tempVal = blocks[oldX][oldY];
   blocks[oldX][oldY] = blocks[newX][newY];
   blocks[newX][newY] = tempVal;
   drawBoard();
}
*/




function moveBlock(x,y) {
  //check the adjacent blocks for a possible move
  //left
  if (x>0 && blocks[x-1][y] == 0){
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").innerHTML = "";
   var tempVal = blocks[x][y];
   blocks[x][y] = blocks[x-1][y];
   blocks[x-1][y] = tempVal;
   drawBoard();
   moves++;
   document.getElementById("Total Moves").textContent = moves;
   checkSolution();
   if(moves>10 || (timerInterval && timerInterval > 6))
   {
    document.getElementById("demo2").innerHTML = "";
    document.getElementById("demo").innerHTML = "GAME OVER!";
   }
  
  }
  
  //above
  else if (y>0 && blocks[x][y-1] == 0) {
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").innerHTML = "";
   var tempVal = blocks[x][y];
   blocks[x][y] = blocks[x][y-1];
   blocks[x][y-1] = tempVal;
   drawBoard();
   moves++;
   document.getElementById("Total Moves").textContent = moves;
   checkSolution();
   if(moves>10 || (timerInterval && timerInterval > 6))
   {
    document.getElementById("demo2").innerHTML = "";
    document.getElementById("demo").innerHTML = "GAME OVER!";
   }
   
  }
  //right
  else if (x<3 && blocks[x+1][y] == 0) {
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").innerHTML = "";
   var tempVal = blocks[x][y];
   blocks[x][y] = blocks[x+1][y];
   blocks[x+1][y] = tempVal;
   drawBoard();
   moves++;
   document.getElementById("Total Moves").textContent = moves;
   checkSolution();
   if(moves>10 ||  (timerInterval && timerInterval > 6))
   {
    document.getElementById("demo2").innerHTML = "";
    document.getElementById("demo").innerHTML = "GAME OVER!";
   }
  
  }
  //below
  else if (y<3 && blocks [x][y+1] == 0) {
    document.getElementById("demo").innerHTML = "";
    document.getElementById("demo2").innerHTML = "";
   var tempVal = blocks[x][y];
   blocks[x][y] = blocks[x][y+1];
   blocks[x][y+1] = tempVal;
   drawBoard();
   moves++;
   document.getElementById("Total Moves").textContent = moves;
   checkSolution();
   if(moves>10 || (timerInterval && timerInterval > 6))
   {
    document.getElementById("demo2").innerHTML = "";
    document.getElementById("demo").innerHTML = "GAME OVER!";
   }
   
  }
  else { 
    document.getElementById("demo2").innerHTML = "";
      document.getElementById("demo").innerHTML = "Invalid Move";
  }
}

function checkSolution() {
  var incr = 1;
  for (var i=0; i<4; i++) {
    for (var j=0; j<4; j++) {
      if (incr == 16) {
         incr = 0;
         stopTimer;
      }
      if (blocks[i][j] != incr) {
        
         return;
      }
      else {
         incr++;
      }
    }
  }
 
    stopTimer;
    document.getElementById("demo").innerHTML = "";
  document.getElementById("demo2").innerHTML = "YOU WIN!!!";

  
}
