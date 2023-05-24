// Game settings and initializations
const cells = document.querySelectorAll("td");
const humanBtn = document.getElementById("human");
const computerBtn = document.getElementById("computer");
const message = document.getElementById("message");
const closeModalBtn = document.querySelector(".modal .close");

let currentPlayer = "X";
let player1 = "X";
let player2 = "O";
let gameMode = "human";

// Function that removes modal from screen when called
function closeModal() {
  const modal = document.getElementById("choosePlayerModal");
  modal.classList.remove("show");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

// Close the modal when the close button is clicked
closeModalBtn.addEventListener("click", function () {
  closeModal();
});

// Event listener for choosing X player
document.getElementById("chooseX").addEventListener("click", function () {
  player1 = "X";
  player2 = "O";
  closeModal();
  currentPlayer = player1;
});

// Event listener for choosing O player
document.getElementById("chooseO").addEventListener("click", function () {
  player1 = "O";
  player2 = "X";
  closeModal();
  currentPlayer = player1;
});

// Handle cell click event
function handleClick() {
  if (this.textContent !== "" || (gameMode === "computer" && currentPlayer === player2)) {
    return;
  }

  this.textContent = currentPlayer;
  checkWin();
  switchPlayer();

  if (gameMode === "computer" && currentPlayer === player2 && !message.textContent) {
    setTimeout(() => {
      computerMove();
      checkWin();
      switchPlayer();
    }, 800);
  }
}

// Make a random move for the computer
function computerMove() {
  const emptyCells = Array.from(cells).filter((cell) => cell.textContent === "");
  if (emptyCells.length === 0) {
    return;
  }
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  randomCell.textContent = player2;
}

// Switch to the next player's turn
function switchPlayer() {
  currentPlayer = (currentPlayer === player1) ? player2 : player1;
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

// Human Button Event listener
humanBtn.addEventListener("click", () => {
  document.getElementById("choosePlayerModal").classList.add("show");
  document.getElementById("choosePlayerModal").style.display = "block";
  document.getElementById("choosePlayerModal").setAttribute("aria-hidden", "false");
  gameMode = "human";
  currentPlayer = player1;
  message.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleClick);
  });

});

//Computer Button Event listener
computerBtn.addEventListener("click", () => {
  document.getElementById("choosePlayerModal").classList.add("show");
  document.getElementById("choosePlayerModal").style.display = "block";
  document.getElementById("choosePlayerModal").setAttribute("aria-hidden", "false");
  gameMode = "computer";
  currentPlayer = player1;
  message.textContent = "";
  cells.forEach((cell) => cell.textContent = "");
  cells.forEach((cell) => cell.addEventListener("click", handleClick));
});
