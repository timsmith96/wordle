// GLOBAL VARIABLES
const keys = document.querySelectorAll('.key');
let cells = document.querySelectorAll('.grid-cell');
const enterKey = document.querySelector('.enter-key');
const deleteKey = document.querySelector('.del-key');
const validWords = ['turds'];
cells = Array.from(cells);
let currentRow = 0;
const gameGrid = {
  0: cells.slice(0, 5),
  1: cells.slice(5, 10),
  2: cells.slice(10, 15),
  3: cells.slice(15, 20),
  4: cells.slice(20, 25),
  5: cells.slice(25, 30),
};

// FUNCTIONS
const validate = () => {
  let filledCells = gameGrid[currentRow].filter(
    (cell) => cell.textContent !== ''
  ).length;
  return filledCells;
};

const updateCell = (cell, letter) => {
  let filledCells = validate();
  if (filledCells === 5) {
    return;
  }
  gameGrid[currentRow][cell].textContent = letter;
  gameGrid[currentRow][cell].style.border = '2px solid #878a8c';
};

const setCell = () => {
  for (let i = 0; i < 5; i++) {
    if (gameGrid[currentRow][i].textContent === '') {
      return gameGrid[currentRow][i].dataset.cell;
    }
  }
};

const deleteCell = () => {
  for (let i = 4; i >= 0; i--) {
    if (gameGrid[currentRow][i].textContent !== '') {
      gameGrid[currentRow][i].textContent = '';
      gameGrid[currentRow][i].style.border = '2px solid #d3d6da';
      return;
    }
  }
};

const checkWord = () => {
  let filledCells = validate();
  if (filledCells % 5 === 0 && filledCells !== 0) {
    let word = gameGrid[currentRow]
      .slice(0, 5)
      .map((cell) => cell.textContent)
      .join('')
      .toLowerCase();
    if (validWords.includes(word)) {
      gameGrid[currentRow].forEach(
        (cell) => (cell.style.pointerEvents = 'none')
      );
      currentRow++;
    }
    console.log(currentRow);
  }
};

// EVENT LISTENERS
keys.forEach((key) => {
  key.addEventListener('click', (e) => {
    let letterClicked = key.dataset.letter;
    let cell = setCell();
    updateCell(cell, letterClicked);
  });
});

cells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    cell.textContent = '';
    cell.style.border = '2px solid #d3d6da';
    currentCell = cell.dataset.cell;
  });
});

deleteKey.addEventListener('click', deleteCell);

enterKey.addEventListener('click', checkWord);
