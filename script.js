const cells = document.querySelectorAll(".cell");
const currentPlayerTag = document.getElementById("currentPlayer");
const resetTag = document.getElementById("reset");
const winnerTag = document.getElementById("winner");

let currentPlayer = "X";

function handleClick(cell) {
  if (!cell.textContent) {
    cell.textContent = currentPlayer;
    if (checkWin()) {
      winnerTag.textContent = "Player " + currentPlayer + " Won";
      winnerTag.classList.remove("winner-failure-color");
      winnerTag.classList.add("winner-success-color");
      markWinningCells();
    } else if (checkDraw()) {
      // Add the check for draw here
      winnerTag.textContent = "It's a Draw!";
      winnerTag.classList.add("winner-failure-color");
      winnerTag.classList.remove("winner-success-color");
    } else {
      updatePlayer(currentPlayer === "X" ? "O" : "X"); // Fix here
    }
  }
}

function checkDraw() {
  return Array.from(cells).every((cell) => cell.textContent !== "");
}

function updatePlayer(cp) {
  currentPlayer = cp;
  currentPlayerTag.textContent = currentPlayer;
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winConditions.some((condition) =>
    condition.every((index) => cells[index].textContent === currentPlayer)
  );
}

function markWinningCells() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winConditions.forEach((condition) => {
    const [cellIndex1, cellIndex2, cellIndex3] = condition;
    if (
      cells[cellIndex1].textContent === currentPlayer &&
      cells[cellIndex2].textContent === currentPlayer &&
      cells[cellIndex3].textContent === currentPlayer
    ) {
      cells[cellIndex1].classList.add("winning-cell");
      cells[cellIndex2].classList.add("winning-cell");
      cells[cellIndex3].classList.add("winning-cell");
      console.log(cellIndex1, cellIndex2, cellIndex3);

      // vertical

      if (
        cellIndex1 + cellIndex2 + cellIndex3 === 9 ||
        cellIndex1 + cellIndex2 + cellIndex3 === 15 ||
        (cellIndex1 + cellIndex2 + cellIndex3 === 12 &&
          cellIndex1 == 1 &&
          cellIndex2 == 4 &&
          cellIndex3 == 7)
      ) {
        cells[cellIndex1].classList.add("vertical");
        cells[cellIndex2].classList.add("vertical");
        cells[cellIndex3].classList.add("vertical");
        console.log("vertical");
      } else if (
        //Horizontal
        cellIndex1 + cellIndex2 + cellIndex3 === 3 ||
        cellIndex1 + cellIndex2 + cellIndex3 === 21 ||
        (cellIndex1 + cellIndex2 + cellIndex3 === 12 &&
          cellIndex1 == 3 &&
          cellIndex2 == 4 &&
          cellIndex3 == 5)
      ) {
        console.log("horizontal");
        cells[cellIndex1].classList.add("horizontal");
        cells[cellIndex2].classList.add("horizontal");
        cells[cellIndex3].classList.add("horizontal");
      } else if (
        (cellIndex1 + cellIndex2 + cellIndex3 === 12) &
        (cellIndex1 == 0 && cellIndex2 == 4 && cellIndex3 == 8)
      ) {
        console.log("d1");

        cells[cellIndex1].classList.add("diagonal1");
        cells[cellIndex2].classList.add("diagonal1");
        cells[cellIndex3].classList.add("diagonal1");
      } else {
        console.log("d2");

        cells[cellIndex1].classList.add("diagonal2");
        cells[cellIndex2].classList.add("diagonal2");
        cells[cellIndex3].classList.add("diagonal2");
      }
    }
  });
}

function resetBoard() {
  cells.forEach((cell) => {
    cell.textContent = "";
    try {
      cell.classList.remove("winning-cell");
    } catch (e) {}
    try {
      cell.classList.remove("horizontal");
    } catch (e) {}
    try {
      cell.classList.remove("vertical");
    } catch (e) {}
    try {
      cell.classList.remove("diagonal1");
    } catch (e) {}
    try {
      cell.classList.remove("diagonal2");
    } catch (e) {}
  });
  updatePlayer("X"); // Change starting player to "X"
  winnerTag.textContent = "";
  try {
    winnerTag.classList.remove("winner-success-color");
  } catch (e) {}
  winnerTag.classList.add("winner-failure-color");
}

resetTag.addEventListener("click", resetBoard);
