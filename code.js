let board = ["", "", "", "", "", "", "", "", ""];
//fucntion to create players
const Player = (name, wins, symbol) => {
  return { name, wins, symbol };
};
const player1 = Player("Player One", 0, "X");
const player2 = Player("Player Two", 0, "O");
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
    let blank = 0;
    condition.forEach((position) => {
      if (board.at(position) == "X") {
        return ++player1r;
      } else if (board.at(position) == "O") {
        return ++player2r;
      }
    });
    if (player1r == 3) {
      condition.forEach((position) => {
        document.getElementById("space" + position).style["background-color"] =
          "navajowhite";
      });
      ++player1.wins;
      document.getElementById("winner").textContent = "X wins";
      document.getElementById("xscore").textContent = player1.wins;
      for (let i = 0; i < 9; ++i) {
        document.getElementById("space" + i).style["pointer-events"] = "none";
      }
    } else if (player2r == 3) {
      condition.forEach((position) => {
        document.getElementById("space" + position).style["background-color"] =
          "navajowhite";
      });
      ++player2.wins;
      document.getElementById("winner").textContent = "O wins";
      document.getElementById("oscore").textContent = player2.wins;
      for (let i = 0; i < 9; ++i) {
        document.getElementById("space" + i).style["pointer-events"] = "none";
      }
    } else {
      ++blank;
      if (blank == 0) {
        for (let i = 0; i < 9; ++i) {
          document.getElementById("space" + i).style["pointer-events"] = "none";
        }
        document.getElementById("winner").textContent = "draw";
      }
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
    document.getElementById("space" + i).addEventListener("mouseenter", () => {
      if (board.at(i) == "") {
        document.getElementById(i).textContent = getActivePlayer().symbol;
        document.getElementById(i).style.color = "peru";
      }
    });
    document.getElementById("space" + i).addEventListener("mouseleave", () => {
      if (board.at(i) == "") {
        document.getElementById(i).textContent = "";
      }
    });
    document.getElementById("space" + i).addEventListener("click", () => {
      if (board.at(i) == "") {
        document.getElementById(i).style.color = "maroon";
        document.getElementById("space" + i).style["background-color"] =
          "bisque";
        board.splice(i, 1, getActivePlayer().symbol);
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
  activePlayer = player1;
  for (let i = 0; i < 9; ++i) {
    let current = document.getElementById("space" + i);
    current.style["pointer-events"] = "auto";
    current.style["background-color"] = "seashell";
  }
  document.getElementById("winner").textContent = "";
  input();
  displayController();
}
