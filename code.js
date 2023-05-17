//winning conditions
// X X X O O O O O O
// O O O X X X O O O
// O O O O O O X X X
// X O O X O O X O O
// O X O O X O O X O
// O O X O O X O O X
// X O O O X O O O X
// O O X O X O X O O
const board = ["X", "X", "O", "X", "O", "O", "X", "X", "O"];
const gameboard = (() => {
  for (let i = 0; i < 9; ++i) {
    document.getElementById(i).textContent = board[i];
  }
})();