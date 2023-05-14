// Declare variables and initialize game settings
const cells = document.querySelectorAll("td");
const humanBtn = document.getElementById("human");
const computerBtn = document.getElementById("computer");
const message = document.getElementById("message");
let currentPlayer = "X";
let humanPlayer = "X";
let computerPlayer = "O";
let gameMode = "human";

// Define function to handle cell clicks
function handleClick() {
  // Check if cell is already occupied or it's the computer's turn in computer mode
  if (this.textContent !== "" || gameMode === "computer" && currentPlayer === computerPlayer) {
    return;
  }

  // Mark the cell with the current player's symbol
  this.textContent = currentPlayer;

  // Check if the game has been won or if it's a draw
  checkWin();

  // Switch to the next player's turn
  switchPlayer(currentPlayer);

  // If it's the computer's turn in computer mode, make a move after a delay
  if (gameMode === "computer" && currentPlayer === computerPlayer) {
    setTimeout(() => {
      computerMove();
      checkWin();
      switchPlayer(currentPlayer);

    }, 1000);
  }
}

// Define function to make a random move for the computer
function computerMove() {
  const emptyCells = Array.from(cells).filter((cell) => cell.textContent === "");
  if (emptyCells.length === 0) {
    return;
  }
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = computerPlayer;
}

// Define function to switch to the next player's turn
function switchPlayer(player) {
  if (gameMode === "human" && player === humanPlayer) {
    currentPlayer = player === "X" ? "O" : "X";
  } else {
    currentPlayer = player === "O" ? "X" : "O";
  }
}

// Define function to check if the game has been won or if it's a draw
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
    if (
      cells[combo[0]].textContent !== "" &&
      cells[combo[0]].textContent === cells[combo[1]].textContent &&
      cells[combo[1]].textContent === cells[combo[2]].textContent
    ) {
      winner = cells[combo[0]].textContent;
    }
  });

  if (winner) {
    message.textContent = `${winner} wins!`;
    cells.forEach((cell) => (cell.removeEventListener("click", handleClick)));
    return;
  }

  if (Array.from(cells).every((cell) => cell.textContent !== "")) {
    message.textContent = "Draw!";
    return;
  }
}

// Add event listeners to cells and buttons
cells.forEach((cell) => cell.addEventListener("click", handleClick));


humanBtn.addEventListener("click", () => {
  gameMode = "human";
  currentPlayer = humanPlayer;
  message.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });
  switchPlayer(humanPlayer);
});
computerBtn.addEventListener("click", () => {
  gameMode = "computer";
  currentPlayer = humanPlayer;
  message.textContent = "";
  cells.forEach((cell) => (cell.textContent = ""));
  cells.forEach((cell) => (cell.addEventListener("click", handleClick)));
});
