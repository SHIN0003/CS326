import { Game } from "./game.js";

// UI Components
const boardGridElement = document.getElementById("board");
const playButtonElement = document.getElementById("play");

// Game Board
const game = new Game();

window.Game = Game;

window.addEventListener("DOMContentLoaded", () => {
  // Initialize the game board
  game.render(boardGridElement);
});

// We check to make sure the play button exists before adding the event
// listener. You are to add the play button as part of this homework. If we do
// not test if it exists, the code will break when running the tests. You can
// safely remove this conditional after you add the play button.
if (playButtonElement) {
  playButtonElement.addEventListener("click", () => {
    const word = document.getElementById("word").value;
    const x = parseInt(document.getElementById("x").value, 10);
    const y = parseInt(document.getElementById("y").value, 10);
    const direction = document.getElementById("direction").value;
  
    // Call the Game object's playAt method
    game.playAt(word, {x: x, y: y}, direction === "horizontal");
  
    // Call the Game object's render method
    
    game.render(boardGridElement);
  });
}

