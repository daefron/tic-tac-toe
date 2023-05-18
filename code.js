let board = ["", "", "", "", "", "", "", "", ""];
var win = 0;
const Player = (name, wins, symbol) => {
  return { name, wins, symbol };
};
const player1 = Player("Player One", 0, "X");
let player2 = Player("no player", 0, "O");
function playerHuman() {
  document.querySelector(".playermodal").style.visibility = "hidden";
  return (player2 = Player("Player Two", 0, "O"));
}
function playerAi() {
  document.querySelector(".playermodal").style.visibility = "hidden";
  return (player2 = Player("AI", 0, "O"));
}
function displayController() {
  for (let i = 0; i < 9; ++i) {
    document.getElementById(i).textContent = board[i];
  }
}
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
      return win = 1;
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
      return win = 1;
    }
  });
  let blank = 0;
  for (let i = 0; i < 9; ++i) {
    if (board.at(i) == "")
    ++blank;
  }
  if (blank == 0 && winner == 0) {
    for (let i = 0; i < 9; ++i) {
      document.getElementById("space" + i).style["pointer-events"] = "none";
    }
    document.getElementById("winner").textContent = "draw";
  }
  console.log(win);
  return win;
}
let activePlayer = player1;
function turnSwitch(win) {
  console.log(win);
  activePlayer = activePlayer === player1 ? player2 : player1;
  if (activePlayer.name == "AI" && win == 0) {
    aiTurn();
  } 
}
function aiTurn() {
  let blank = 0;
  for (let i = 0; i < 9; ++i) {
    if (board.at(i) == "")
    ++blank;
  }
  if (blank == 0) {
    return;
  }
  let tester = -1;
  while (tester == -1) {
    let num = Math.floor(Math.random() * 9);
    console.log(num);
    if (board.at(num) == "") {
      board.splice(num, 1, getActivePlayer().symbol);
      document.getElementById(num).style.color = "maroon";
      document.getElementById("space" + num).style["background-color"] = "bisque";
      tester = num;
    }
  }
  winner();
  turnSwitch();
}
const getActivePlayer = () => activePlayer;
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
        winner();
        turnSwitch(win);
        return displayController();
      }
    });
  }
}
function reset() {
  board = ["", "", "", "", "", "", "", "", ""];
  activePlayer = player1;
  for (let i = 0; i < 9; ++i) {
    let current = document.getElementById("space" + i);
    current.style["pointer-events"] = "auto";
    current.style["background-color"] = "seashell";
  }
  document.getElementById("winner").textContent = "";
  win = 0;
  input();
  displayController();
}
input();
