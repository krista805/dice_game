/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

how to create fundamental game variables
how to generate a random number
how to manipulate the DOM
how to read from the DOM
How to change css styles

set up event listeners, use callback and anonymous function

*/

var scores, roundScore, activePlayer, gamePlaying;

// scores = [0, 0];
// roundScore = 0;
// activePlayer = 0;

// placed starter variables into an init function
init();

// document.querySelector('#current-' + activePlayer).textContent = dice;
// OR
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// function btn() {
//     //do something here
// }
// btn();

// set up event handler
// document.querySelector('.btn-roll').addEventListener('click', btn);
//the btn here ('click', btn)is called the call back function because it's a function we pass into another function as an argument

//An anonymous function dosen't have a name is a function that cannot be reused
//('click', function(){ do something here...});
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //1. add CURRENT score to the players global score
    scores[activePlayer] += roundScore;
    // scores[activePlayer] = scores[activePlayer] + roundScore;

    //2. Update the UI
    //adds current score to round score
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    console.log(scores[activePlayer]);

    // 3. Check if player won the game
    if (scores[activePlayer] >= 50) {
      //if they won, replace the player name with 'Winner!'
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

//use this function to keey the DRY method
function nextPlayer() {
  //Next Player
  //this is ternirary operator, which is a cleaner if else statement
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
