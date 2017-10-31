// Generate a board for the player
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  // An array to hold the player's board as we generate it
  let board = [];
  // Insert rows and columns.
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    let row = [];
    for (let columnIndex = 0; columnIndex <numberOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  // Return the generated board.
  return board;
}

// Generate a bomb board with random bombs on it.
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    let row = [];
    for (let columnIndex = 0; columnIndex <numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // The code in your while loop has the potential to place bombs on top of
    // already existing bombs. This will be fixed when you learn about control flow.
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }

  return board;
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3, 4);

let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
