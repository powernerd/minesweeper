'use strict';

// Generate a board for the player
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  // An array to hold the player's board as we generate it
  var board = [];
  // Insert rows and columns.
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  // Return the generated board.
  return board;
};

// Generate a bomb board with random bombs on it.
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }

  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // The code in your while loop has the potential to place bombs on top of
    // already existing bombs. This will be fixed when you learn about control flow.
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }

  return board;
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);

var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);