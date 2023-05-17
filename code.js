let board = ["O", "", "", "O", "", "", "O", "", ""];
//function to get button inputs
for (let i = 0; i < 9; ++i) {
  document.getElementById("space" + i).addEventListener("click", () => {
    if (board.at(i) == "") {
      console.log(i + "X"); //replace X with turn
      board.splice(i, 1, "X"); //replace X with turn
      console.log(board);
      return displayController();
    }
  });
}
//function to push board onto display
function displayController() {
  for (let i = 0; i < 9; ++i) {
    document.getElementById(i).textContent = board[i];
  }
}
displayController();
//function to determine if/who wins
//winning conditions
// 0 1 2|3 4 5|6 7 8
// X X X|     |       const row1 = [0,1,2];
//      |X X X|       const row2 = [3,4,5];
//      |     |X X X  const row3 = [6,7,8];
// X    |X    |X      const column1 = [0,3,6];
//   X  |  X  |  X    const column2 = [1,4,7];
//     X|    X|    X  const column3 = [2,5,8];
// X    |  X  |    X  const diag1 = [0,4,8];
//     X|  X  |X      const diag2 = [2,4,6];
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
    let win = 0;
    let lose = 0;
    condition.forEach((position) => {
      if (board.at(position) == "X") {
        return ++win;
      } else if (board.at(position) == "O") {
        return ++lose;
      }
    });
    if (win == 3) {
      console.log(winConditions[condition]);
      console.log("win");
      // return win();
    } else if (lose == 3) {
      console.log(condition);
      console.log("lose");
      // return lose();
    }
  });
}
winner();
