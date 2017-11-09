// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`
import { Board } from './board.js';

class Game {
  // When a user creates an instance of a board (using the constructor), they will
  // be asked to specify the size of the board as well as the number of bombs on
  // the board
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  // playMove will include all of the functionality needed to play a session of
  // Minesweeper, including flipping a tile, letting the user know if they
  // discovered a bomb, and allowing a user to continue otherwise (until they win,
  // or lose).
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      // If the flipped tile has a bomb, the game is over
      console.log('Game over, you lose!');
      this._board.print();
    } else if (this._board.hasSafeTiles() === false) {
      // Else, if the board does not have any safe tiles left, the player has won the game
      console.log('You\'ve won! Congratulations!');
      this._board.print();
    } else {
      // Otherwise, the player should be allowed to continue playing
      console.log('Current board:');
      this._board.print();
    }
  }
}

// Below is a list of some potential features to add to your Minesweeper game:
//
// Add validation to ensure that board dimensions make sense. For example, a board should not be able to be created with more bombs than it has tiles.
// Add a timer which lets players know how long it took them to win (or lose).
// Add recursive flipping, when a tile is flipped that isn't touching a bomb (would have the number zero printed on it), all adjacent tiles additionally flip over.
// Add a method to place flags at a tile instead of flipping that tile. If a square has a flag on it, it can't be flipped over.
