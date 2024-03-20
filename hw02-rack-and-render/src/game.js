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
    let letters = {
      "e": 12, "a": 9, "i": 9, "o": 8, "n": 6, "r": 6, "t": 6, "l": 4, "s": 4, "u": 4,
      "d": 4, "g": 3, "b": 2, "c": 2, "m": 2, "p": 2, "f": 2,
      "h": 2, "v": 2, "w": 2, "y": 2, "k": 1, "j": 1, "x": 1, "q": 1, "z": 1, "*": 2
    };
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
    // Check if the number of tiles to take is greater than the number of remaining tiles
    if (n > this.#bag.length) {
      n = this.#bag.length; // Take only the remaining tiles
    }
  
    let res = []
    res = this.#bag.splice(0, n)
    return res;
  }

  #canBePlacedOnBoard(word, position, direction) {
    // TASK #4.1: Implement the #canBePlacedOnBoard method
    let length = word.length;
    console.log(word)
    console.log(position)
    console.log(direction)
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
    let x = position.x
    let y = position.y
    for (let c of word) {
      if (direction === false) {
        this.#grid[x][y] = c
        y++
      }
      else {
        this.#grid[x][y] = c
        x++
      }
    }
    
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
      console.log("returned false")
      return -1;
    }

    // Place the word on the board
    this.#placeOnBoard(word, position, direction);
    console.log(this.#grid)

    // Compute the score
    return scoring.score(word, position, direction);
  }

  render(element) {
    // TASK #7: Implement the render method
    element.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
      for (let j = 1; j <= 15; j++) {
        const cell = document.createElement("div");
        cell.innerText = this.#grid[i][j] || '';
        cell.classList.add("grid-item");
        if (scoring.label(i, j) !== '') cell.classList.add(scoring.label(i, j))
        element.appendChild(cell)
      }
    }
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
