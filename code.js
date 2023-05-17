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
let board = ["X", "", "O", "O", "X", "", "X", "O", "X"];

function displayController() {
  for (let i = 0; i < 9; ++i) {
    document.getElementById(i).textContent = board[i];
  }
}
displayController();

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
    console.log(condition);
    let win = 0;
    let lose = 0;
    condition.forEach((position) => {
      console.log(position);
      if (board.at(position) == "X") {
        console.log("X");
        return ++win;
      } else if (board.at(position) == "O") {
        console.log("O");
        return ++lose;
      }
    });
    if (win == 3) {
      return console.log("win");
    } else if (lose == 3) {
      return console.log("lose");
    }
  });
}
winner();