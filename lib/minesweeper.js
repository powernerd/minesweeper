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
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  return board;
};
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, -1], [1, -1], [1, 0], [1, 1]];
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[0].length;
  var numberOfBombs = 0;
  neighborOffsets.forEach(function (offset) {
    var neighborRowIndex = rowIndex + offset[0];
    var neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex > 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex > 0 && neighborColumnIndex <= numberOfColumns) {
      if (bombBoard[(neighborRowIndex, neighborColumnIndex)] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[(rowIndex, columnIndex)] !== '') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[(rowIndex, columnIndex)] === 'B') {
    playerBoard[(rowIndex, columnIndex)] = 'B';
  } else {
    playerBoard[(rowIndex, columnIndex)] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
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

flipTile(playerBoard, bombBoard, 0, 0);

console.log('Updated Player Board: ');
printBoard(playerBoard);