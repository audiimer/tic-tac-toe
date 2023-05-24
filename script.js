// Game settings and initializations
const cells = document.querySelectorAll("td");
const humanBtn = document.getElementById("human");
const computerBtn = document.getElementById("computer");
const message = document.getElementById("message");

let currentPlayer = "X";
let humanPlayer = "X";
let computerPlayer = "O";
let gameMode = "human";

// Handle cell click event
function handleClick() {
  if (this.textContent !== "" || (gameMode === "computer" && currentPlayer === computerPlayer)) {
    return;
  }

  this.textContent = currentPlayer;
  checkWin();
  switchPlayer();

  if (gameMode === "computer" && currentPlayer === computerPlayer) {
    setTimeout(() => {
      computerMove();
      checkWin();
      switchPlayer();
    }, 1000);
  }
}

// Make a random move for the computer
function computerMove() {
  const emptyCells = Array.from(cells).filter((cell) => cell.textContent === "");
  if (emptyCells.length === 0) {
    return;
  }
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = computerPlayer;
}

// Switch to the next player's turn
function switchPlayer() {
  currentPlayer = (currentPlayer === humanPlayer) ? computerPlayer : humanPlayer;
}

// Check if the game has been won or if it's a draw
function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = null;
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (cells[a].textContent !== "" && cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent) {
      winner = cells[a].textContent;
    }
  });

  if (winner) {
    message.textContent = `${winner} wins!`;
    cells.forEach((cell) => cell.removeEventListener("click", handleClick));
  }

  if (Array.from(cells).every((cell) => cell.textContent !== "")) {
    message.textContent = "Draw!";
  }
}

// Event listeners for cells and buttons
cells.forEach((cell) => cell.addEventListener("click", handleClick));

humanBtn.addEventListener("click", () => {
  gameMode = "human";
  currentPlayer = humanPlayer;
  message.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });
  switchPlayer();
  currentPlayer = humanPlayer; // Set the currentPlayer to humanPlayer (X) after switchPlayer()
});

computerBtn.addEventListener("click", () => {
  gameMode = "computer";
  currentPlayer = humanPlayer;
  message.textContent = "";
  cells.forEach((cell) => cell.textContent = "");
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
});
