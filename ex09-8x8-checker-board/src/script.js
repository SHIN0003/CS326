const printMe = (i, j) => {
  console.log("You clicked on (" + (i + 1) + ", " + (j + 1) + ")");
};

const build = () => {
  const numCols = 8,
    numRows = 8,
    pieces = [
      "rook",
      "knight",
      "bishop",
      "queen",
      "king",
      "bishop",
      "knight",
      "rook",
    ],
    theGrid = document.getElementById("theGrid");

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-item");

      if ((i + j) % 2 === 0) {
        cell.classList.add("white");
      } else {
        cell.classList.add("black");
      }

      // Add the pieces
      let pieceText = "";
      if (i === 0 || i === 7) {
        pieceText = pieces[j];
      } else if (i === 1 || i === 6) {
        pieceText = "pawn";
      }
      cell.textContent = pieceText;

      cell.addEventListener("click", () => {
        printMe(i, j);
      });
      theGrid.appendChild(cell);
    }
  }
};

build();