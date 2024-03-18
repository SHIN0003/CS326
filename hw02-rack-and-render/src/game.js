import { scoring } from "./scoring.js";

// Given shuffle algorithm for picking words in a bag
function shuffle(array) {
  // Fisher-Yates shuffle, used for random decoder cipher below
  let m = array.length;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    let i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    let t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export class Game {
  // Private fields
  #bag; // The bag of tiles
  #grid; // The game board

  constructor() {
    this.#bag = this.#initBag();
    this.#grid = this.#initGrid();
  }

  #initBag() {
    // TASK #1: Implement the initBag method
    const bag = [];
    // 1 point: E ×12, A ×9, I ×9, O ×8, N ×6, R ×6, T ×6, L ×4, S ×4, U ×4
    // 2 points: D ×4, G ×3
    // 3 points: B ×2, C ×2, M ×2, P ×2
    // 4 points: F ×2, H ×2, V ×2, W ×2, Y ×2
    // 5 points: K ×1
    // 8 points: J ×1, X ×1
    // 10 points: Q ×1, Z ×1
    let letters = {E: 12, A: 9, I: 9, O: 8, N: 6, R: 6, T: 6, L: 4, S: 4, U: 4, 
      D: 4, G: 3, B: 2, C: 2, M: 2, P: 2, F: 2, 
      H: 2, V: 2, W: 2, Y: 2, K: 1, J: 1, X: 1, Q: 1, Z: 1, '*': 2};
    for (let letter in letters) {
      for (let i = 0; i < letters[letter]; i++) {
        bag.push(letter);
      }
    }
    return shuffle(bag);
  }

  #initGrid() {
    // TASK #3: Implement the initGrid method
    const grid = [];
    for (let i = 0; i <= 15; i++) {
      let row = [];
      if (i === 0) {
        grid.push(undefined);
      } 
      else {
        for (let j = 0; j <= 15; j++) {
          if (j === 0) {
            row.push(undefined)
          }
          else {
            row.push(null);
          }
        }
        grid.push(row);
      }
    }
    
    return grid;
  }

  /**
   * This function removes the first n tiles from the bag and returns them. If n
   * is greater than the number of remaining tiles, this removes and returns all
   * the tiles from the bag. If the bag is empty, this returns an empty array.
   * @param {number} n The number of tiles to take from the bag.
   * @returns {Array<string>} The first n tiles removed from the bag.
   */
  takeFromBag(n) {
    // TASK #5: Implement the takeFromBag method
    
  }

  #canBePlacedOnBoard(word, position, direction) {
    // TASK #4.1: Implement the #canBePlacedOnBoard method
    let length = word.length;
    if (position === undefined || position.x === undefined || position.y === undefined 
      || position.x < 1 || position.x > 15 || position.y < 1 || position.y > 15 || direction === undefined 
      || word === undefined) {
        return false;
    }
    if (direction === true) {
      if (position.y + length - 1 <= 15) {
        return true
      }
    }
    else if (direction === false) {
      if (position.x + length - 1 <= 15) {
        return true
      }
    }
    
    return false;
  }

  #placeOnBoard(word, position, direction) {
    // TASK #4.2: Implement the #placeOnBoard method
    
  }

  /**
   * This function will be called when a player takes a turn and attempts to
   * place a word on the board. It will check whether the word can be placed at
   * the given position. If not, it'll return -1. It will then compute the score
   * that the word will receive and return it, taking into account special
   * positions.
   *
   * @param {string} word The word to be placed.
   * @param {Object<x|y, number>} position The position, an object with
   * properties x and y. Example: { x: 2, y: 3 }.
   * @param {boolean} direction Set to true if horizontal, false if vertical.
   * @returns {number} The score the word will obtain (including special tiles),
   * or -1 if the word cannot be placed.
   */
  playAt(word, position, direction) {
    // We first check if the word can be placed
    if (!this.#canBePlacedOnBoard(word, position, direction)) {
      return -1;
    }

    // Place the word on the board
    this.#placeOnBoard(word, position, direction);

    // Compute the score
    return scoring.score(word, position, direction);
  }

  render(element) {
    // TASK #7: Implement the render method
    
  }

  // These functions are used by the auto-grader to check your implementation.
  // You can ignore them as part of the rest of the implementation, but feel
  // free to use them for your own testing purposes.
  testGetBag() {
    return this.#bag;
  }

  testGetGrid() {
    return this.#grid;
  }

  testCanBePlacedOnBoard(word, position, direction) {
    return this.#canBePlacedOnBoard(word, position, direction);
  }

  testPlaceOnBoard(word, position, direction) {
    this.#placeOnBoard(word, position, direction);
  }
}
