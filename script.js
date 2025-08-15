const cells = document.querySelectorAll("[data-cell]");
const board = document.querySelector(".game");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains("X") || cell.classList.contains("O")) return;

  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (isDraw()) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
  }
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(player);
    });
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains("X") || cell.classList.contains("O")
  );
}

function restartGame() {
  cells.forEach(cell => {
    cell.classList.remove("X", "O");
    cell.textContent = "";
  });
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "X's Turn";
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
restartBtn.addEventListener("click", restartGame);

// Start game
statusText.textContent = "X's Turn";
