let board = ["", "", "", "", "", "", "", "", ""];
let diagCondition = 0;
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
var win = 0;
const Player = (name, wins, symbol) => {
  return { name, wins, symbol };
};
const player1 = Player("Player One", 0, "X");
let activePlayer = player1;
function playerHuman() {
  document.querySelector(".playermodal").style.visibility = "hidden";
  reset();
  player2 = Player("Player Two", 0, "O");
  document.getElementById("change").textContent = "player";
  document.getElementById("xscore").textContent = player1.wins;
  document.getElementById("oscore").textContent = player2.wins;
}
function playerAi() {
  document.querySelector(".playermodal").style.visibility = "hidden";
  reset();
  player2 = Player("AI", 0, "O");
  document.getElementById("change").textContent = "random";
  document.getElementById("xscore").textContent = player1.wins;
  document.getElementById("oscore").textContent = player2.wins;
}
function playerAiUnbeatable() {
  document.querySelector(".playermodal").style.visibility = "hidden";
  reset();
  player2 = Player("Unbeatable AI", 0, "O");
  document.getElementById("change").textContent = "unbeatable";
  document.getElementById("xscore").textContent = player1.wins;
  document.getElementById("oscore").textContent = player2.wins;
}
playerHuman();
function changeOpponent() {
  document.querySelector(".playermodal").style.visibility = "visible";
  player1.wins = 0;
  player2.wins = 0;
}
function displayController() {
  for (let i = 0; i < 9; ++i) {
    document.getElementById(i).textContent = board[i];
  }
}
function winner() {
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
      return (win = 1);
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
      return (win = 1);
    }
  });
  let blank = 0;
  for (let i = 0; i < 9; ++i) {
    if (board.at(i) == "") ++blank;
  }
  if (blank == 0 && win == 0) {
    for (let i = 0; i < 9; ++i) {
      document.getElementById("space" + i).style["pointer-events"] = "none";
      document.getElementById("space" + i).style["background-color"] = "navajowhite";
    }
    document.getElementById("winner").textContent = "draw";
  }
  return win;
}
function turnSwitch(win) {
  activePlayer = activePlayer === player1 ? player2 : player1;
  if (board.includes("") == true) {
    if (activePlayer.name == "AI" && win == 0) {
      aiTurn();
    } else if (activePlayer.name == "Unbeatable AI" && win == 0) {
      unbeatableAiTurn();
    }
  }
}
function aiTurn() {
  let blank = 0;
  for (let i = 0; i < 9; ++i) {
    if (board.at(i) == "") ++blank;
  }
  if (blank == 0) {
    return;
  }
  let tester = -1;
  while (tester == -1) {
    let num = Math.floor(Math.random() * 9);
    if (board.at(num) == "") {
      board.splice(num, 1, getActivePlayer().symbol);
      document.getElementById(num).style.color = "maroon";
      document.getElementById("space" + num).style["background-color"] =
        "bisque";
      tester = num;
    }
  }
  winner();
  turnSwitch();
}
function unbeatableAiTurn() {
  let testCondition = 0;
  if (board.at(4) == "") {
    board.splice(4, 1, getActivePlayer().symbol);
    document.getElementById(4).style.color = "maroon";
    document.getElementById("space" + 4).style["background-color"] = "bisque";
  } else if (board.at(4) !== "") {
    let splicePosition = 0;
    //if can win = win
    Object.values(winConditions).forEach((condition) => {
      let xAmount = 0;
      let oAmount = 0;
      let blankAmount = 0;
      let blankPosition = 0;
      condition.forEach((position) => {
        if (board.at(position) == "X") {
          return ++xAmount;
        }
        if (board.at(position) == "") {
          blankPosition = position;
          return ++blankAmount;
        }
        if (board.at(position) == "O") {
          return ++oAmount;
        }
      });
      if (oAmount > 1 && blankAmount > 0 && xAmount == 0) {
        splicePosition = blankPosition;
        testCondition = 1;
      }
    });
    //if can block = block
    if (testCondition == 0) {
      Object.values(winConditions).forEach((condition) => {
        let xAmount = 0;
        let oAmount = 0;
        let blankAmount = 0;
        let blankPosition = 0;
        condition.forEach((position) => {
          if (board.at(position) == "X") {
            return ++xAmount;
          }
          if (board.at(position) == "") {
            blankPosition = position;
            return ++blankAmount;
          }
          if (board.at(position) == "O") {
            return ++oAmount;
          }
        });
        if (xAmount > 1 && blankAmount > 0 && oAmount == 0) {
          splicePosition = blankPosition;
          testCondition = 1;
        }
      });
    }
    //checks for diag strategy
    if (testCondition == 0 && diagCondition !== 1) {
      let xAmount = 0;
      let oAmount = 0;
      let blankAmount = 0;
      let blankPosition = 0;
      console.log(winConditions.diag1);
      winConditions.diag1.forEach((position) => {
        if (board.at(position) == "X") {
          blankPosition = position;
          return ++xAmount;
        }
        if (board.at(position) == "") {
          return ++blankAmount;
        }
        if (board.at(position) == "O") {
          return ++oAmount;
        }
      });
      if (xAmount == 2 && blankAmount == 0 && oAmount == 1) {
        console.log(blankPosition);
        splicePosition = blankPosition - 1;
        console.log(splicePosition);
        testCondition = 1;
        diagCondition = 1;
      }
      console.log(winConditions.diag2);
      xAmount = 0;
      oAmount = 0;
      blankAmount = 0;
      blankPosition = 0;
      winConditions.diag2.forEach((position) => {
        if (board.at(position) == "X") {
          blankPosition = position;
          return ++xAmount;
        }
        if (board.at(position) == "") {
          return ++blankAmount;
        }
        if (board.at(position) == "O") {
          return ++oAmount;
        }
      });
      if (xAmount == 2 && blankAmount == 0 && oAmount == 1) {
        console.log(blankPosition);
        splicePosition = blankPosition + 1;
        console.log(splicePosition);
        testCondition = 1;
        diagCondition = 1;
      }
    }
    //if can put in corner = put in corner
    diagCondition = 1;
    if (testCondition == 0) {
      Object.values(winConditions).forEach((condition) => {
        let xAmount = 0;
        let oAmount = 0;
        let blankAmount = 0;
        let blankPosition = 0;
        condition.forEach((position) => {
          if (board.at(position) == "X") {
            return ++xAmount;
          }
          if (board.at(position) == "") {
            blankPosition = position;
            return ++blankAmount;
          }
          if (board.at(position) == "O") {
            return ++oAmount;
          }
        });
        if (
          xAmount > 0 &&
          blankAmount > 0 &&
          oAmount == 0 &&
          (blankPosition == 0 ||
            blankPosition == 2 ||
            blankPosition == 6 ||
            blankPosition == 8)
        ) {
          splicePosition = blankPosition;
          testCondition = 1;
        }
      });
    }
    //if half a winning move = pre-emptive block
    if (testCondition == 0) {
      Object.values(winConditions).forEach((condition) => {
        let xAmount = 0;
        let oAmount = 0;
        let blankAmount = 0;
        let blankPosition = 0;
        condition.forEach((position) => {
          if (board.at(position) == "X") {
            return ++xAmount;
          }
          if (board.at(position) == "") {
            blankPosition = position;
            return ++blankAmount;
          }
          if (board.at(position) == "O") {
            return ++oAmount;
          }
        });
        if (xAmount > 0 && blankAmount > 0 && oAmount == 0) {
          splicePosition = blankPosition;
          testCondition = 1;
        }
      });
    }
    if (testCondition == 1) {
      board.splice(splicePosition, 1, getActivePlayer().symbol);
      document.getElementById(splicePosition).style.color = "maroon";
      document.getElementById("space" + splicePosition).style[
        "background-color"
      ] = "bisque";
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
        document.getElementById("change").style["pointer-events"] = "all";
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
  document.getElementById("change").style["pointer-events"] = "all";
  win = 0;
  diagCondition = 0;
  input();
  displayController();
}
input();
