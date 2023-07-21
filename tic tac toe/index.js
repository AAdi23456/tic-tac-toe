const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let isGameOver = false;

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick() {
  if (isGameOver || this.textContent !== '') return;

  this.textContent = currentPlayer;
  this.setAttribute('data-cell', currentPlayer);

  if (checkWin()) {
    isGameOver = true;
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
      resetGame();
    }, 10);
    return;
  }

  if (checkDraw()) {
    isGameOver = true;
    setTimeout(() => {
      alert("It's a draw!");
      resetGame();
    }, 10);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
  });
}

function checkDraw() {
  return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.setAttribute('data-cell', '');
  });

  currentPlayer = 'X';
  isGameOver = false;
}
