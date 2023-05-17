let board = ["", "", "", "", "", "", "", "", ""];
//fucntion to create players
const Player = (name, wins, symbol) => {
  return { name, wins, symbol };
};
const player1 = Player("Player One", 0, "X");
const player2 = Player("Player Two", 0, "O");
console.log(player1);
console.log(player2);
//function to push board onto display
function displayController() {
  for (let i = 0; i < 9; ++i) {
    document.getElementById(i).textContent = board[i];
  }
}
//function to determine if/who wins
function winner() {
  const winConditions = {
    row1: [0, 1, 2],
    row2: [3, 4, 5],
    row3: [6, 7, 8],
    column1: [0, 3, 6],
    column2: [1, 4, 7],
    column3: [2, 5, 8],
    diag1: [0, 4, 8],
    diag2: [2, 4, 6],
  };
  Object.values(winConditions).forEach((condition) => {
    let player1r = 0;
    let player2r = 0;
    condition.forEach((position) => {
      if (board.at(position) == "X") {
        return ++player1r;
      } else if (board.at(position) == "O") {
        return ++player2r;
      }
    });
    if (player1r == 3) {
      console.log(condition);
      condition.forEach((position) => {
        document.getElementById("space" + position).style["background-color"] =
          "navajowhite";
      });
      console.log("player 1 wins");
      ++player1.wins;
      for (let i = 0; i < 9; ++i) {
        document.getElementById("space" + i).style["pointer-events"] = "none";
      }
      // create reset button
    } else if (player2r == 3) {
      console.log(condition);
      condition.forEach((position) => {
        document.getElementById("space" + position).style["background-color"] =
          "navajowhite";
      });
      console.log("player 2 wins");
      ++player2.wins;
      // create reset button
    }
  });
}
//function to set turns
let activePlayer = player1;
function turnSwitch() {
  activePlayer = activePlayer === player1 ? player2 : player1;
}
const getActivePlayer = () => activePlayer;
//function to get button inputs
function input() {
  for (let i = 0; i < 9; ++i) {
    document
      .getElementById("space" + i)
      .addEventListener("click", function active() {
        if (board.at(i) == "") {
          board.splice(i, 1, getActivePlayer().symbol);
          console.log(board);
          turnSwitch();
          winner();
          return displayController();
        }
      });
  }
}
input();
//function to reset board
function reset() {
  board = ["", "", "", "", "", "", "", "", ""];
  console.log(player1);
  console.log(player2);
  activePlayer = player1;
  for (let i = 0; i < 9; ++i) {
    document.getElementById("space" + i).style["pointer-events"] = "auto";
    document.getElementById("space" + i).style["background-color"] = "seashell";
  }
  input();
  displayController();
}
// runs displayController X
// creates players X
// sets turn X
// player clicks => checks player => uses player symbol X
// runs displayController and winner X
// repeats until finds winner X
// if winner, find winning condition to highlight, reset game
