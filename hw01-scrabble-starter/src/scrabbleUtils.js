// This module contains utility functions for the scrabble game.

// This imports the dictionary of scrabble words.
import { dictionary } from "./dictionary.js";

/**
 * This function checks whether a given word can be constructed with the
 * available tiles. The availableTiles object should not be modified.
 *
 * @param {object} availableTiles The available tiles to use.
 * @param {string} word The word to check.
 * @returns {boolean} Returns true if the word can be constructed with the given
 *                    tiles; false otherwise.
 */
function canConstructWord(availableTiles, word) {
  // TASK #2: Word Checker
  let tilesCopy = availableTiles;
  for (let i = 0; i < word.length; i++) {
    if (tilesCopy [word[i]] === undefined && tilesCopy ['*'] > 0) {
      tilesCopy ['*'] -= 1;
    }
    else if (tilesCopy [word[i]] === undefined || tilesCopy [word[i]] === 0) {
      return false;
    }
    else if (word[i] in tilesCopy ) {
      tilesCopy [word[i]] -= 1;
    }
  
  }
  return true;
}

/**
 * We define the base score of a word the score obtained by adding each letter's
 * score, without taking board position into account. This function will compute
 * and return the base score of a given word.
 *
 * @param {string} word The word to compute a base score for.
 * @returns {number} The base score of the given word.
 */
function baseScore(word) {
  // TASK #3: Base Score Calculator
  let score = 0;

  let letterScore = {
    'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4, 'i': 1, 'j': 8, 'k': 5, 'l': 1, 'm': 3,
    'n': 1, 'o': 1, 'p': 3, 'q': 10, 'r': 1, 's': 1, 't': 1, 'u': 1, 'v': 4, 'w': 4, 'x': 8, 'y': 4, 'z': 10, '*': 0
  };
  let letterCount = {'e': 12, 'a': 9, 'i': 9, 'o': 8, 'n': 6, 'r': 6, 't': 6, 'l': 4, 's': 4, 'u': 4, 'd': 4, 'g': 3,
    'b': 2, 'c': 2, 'm': 2, 'p': 2, 'f': 2, 'h': 2, 'v': 2, 'w': 2, 'y': 2, 'k': 1, 'j': 1, 'x': 1, 'q': 1, 'z': 1, '*': 2};
  
  for (let i = 0; i < word.length; i++) {
    if (letterCount[word[i]] === undefined || letterCount[word[i]] === 0) {
      continue;
    }
    score += letterScore[word[i]];
    letterCount[word[i]] -= 1;
  }
  return score;
}

/**
 * Finds and returns every word from the dictionary that can be constructed with
 * the given tiles.
 *
 * @param {object} availableTiles The available tiles to use.
 * @returns {string[]} The words that can be constructed with the given tiles.
 */
function possibleWords(availableTiles) {
  // TASK #4: Possible Words
  let res = [];
  if (Object.keys(availableTiles).length === 0) {
    return res;
  }
  for (let i = 0; i < dictionary.length; i++) {
    let tilesCopy = availableTiles;
    if (canConstructWord(tilesCopy, dictionary[i])) {
      let word = dictionary[i];
      for (letter in word) {
        let withWild = "";
        if (letter in tilesCopy && tilesCopy[letter] > 0) {
          tilesCopy[letter] -= 1;
          withWild += letter;
        }
        else if (tilesCopy['*'] > 0) {
          tilesCopy['*'] -= 1;
          withWild += '*';
        }
        else {
          break;
        }
        res.push(withWild);
      }
    }
  }
  return res;
}

/**
 * Finds and returns the word(s) with the highest base score from the
 * dictionary, given a set of available tiles.
 *
 * @param {object} availableTiles The available tiles to use.
 * @returns {string[]} The words with the highest base score.
 */

function bestPossibleWords(availableTiles) {
  // TASK #5: Best Possible Words
  let res = [];
  let maxScore = 0;
  if (possibleWords(availableTiles).length === 0) {
    return res;
  }
  let possibleWordsArr = possibleWords(availableTiles);
  for (let i = 0; i < possibleWordsArr.length; i++) {
    let score = baseScore(possibleWordsArr[i]);
    if (score > maxScore) {
      maxScore = score;
      res = [possibleWordsArr[i]];
    }
    else if (score === maxScore) {
      res.push(possibleWordsArr[i]);
    }
  }
  return res;
}


// This exports our public functions.
export { canConstructWord, baseScore, possibleWords, bestPossibleWords };


