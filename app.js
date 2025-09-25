// --- DOM Elements ---
const statusDisplay = document.querySelector('.game-status');
const restartButton = document.querySelector('.restart-button');
const cells = document.querySelectorAll('.cell');

let turnO = true; // true => place 'O', false => place 'X'
let count = 0;    // track moves for draw

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// --- Reset game ---
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  statusDisplay.innerText = "Turn for O"; 
};

// --- Cell click handler ---
cells.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O";
      box.classList.add('o');
      turnO = false;
      statusDisplay.innerText = "Turn for X";
    } else {
      box.innerText = "X";
      box.classList.add('x');
      turnO = true;
      statusDisplay.innerText = "Turn for O";
    }

    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (isWinner) return;

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// --- Game draw ---
const gameDraw = () => {
  statusDisplay.innerText = `Game ended in a draw! 🤝`;
  disableBoxes();
};

// --- Disable all boxes ---
const disableBoxes = () => {
  for (let box of cells) {
    box.disabled = true;
  }
};

// --- Enable all boxes ---
const enableBoxes = () => {
  for (let box of cells) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove('x','o','winner');
  }
};

// --- Show winner ---
const showWinner = (winner) => {
  statusDisplay.innerText = `Congratulations, Winner is ${winner} 🎉`;
  disableBoxes();
};

// --- Check winner ---
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = cells[pattern[0]].innerText;
    let pos2Val = cells[pattern[1]].innerText;
    let pos3Val = cells[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        cells[pattern[0]].classList.add('winner');
        cells[pattern[1]].classList.add('winner');
        cells[pattern[2]].classList.add('winner');
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

// --- Restart button ---
restartButton.addEventListener("click", resetGame);

// --- Initialize ---
statusDisplay.innerText = "Turn for O";
