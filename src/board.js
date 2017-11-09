export class Board {
  // When a user creates an instance of a board (using the constructor), they will
  // need to specify the size of the board as well as the number of bombs on the
  // board.
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    // numberOfTiles: This instance property will represent the size of the game board and will be
    // used to determine if the game is over or not at the end of each turn.
    this._numberOfTiles = numberOfRows * numberOfColumns;
    // Create a playerBoard which will hold the player's game state
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    // Create a bombBoard which will hold the positions of all the bombs.
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  // Add a playerBoard() Getter Method
  get playerBoard() {
    return this._playerBoard;
  }
  // Add flipTile() to the Board Class
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }
  // Add getNumberOfNeighborBombs() to the Board Class
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  // Check for Safe Tiles
  hasSafeTiles() {
    // A user will win if and only if all of the non-bomb tiles have been flipped.
    // If these two values are equal, then the player has won the game (there are no more safe tiles on the board!).
    // Otherwise, if the values are not equal, the player has to continue playing the game (flipping tiles).
    return (this._numberOfTiles !== this._numberOfBombs);
  }
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    // console.log(this._bombBoard.map(row => row.join(' | ')).join('\n'));
  }
  // Generate a board for the player
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    return board;
  }
}
