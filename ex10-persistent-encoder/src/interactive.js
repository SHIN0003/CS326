import { Decoder } from "./decoder.js";

// Create a decoder object.
const decoder = new Decoder("");

// Assign event handlers to events.
const keyTextInput = document.getElementById("key");
keyTextInput.style.backgroundColor = "yellow";
keyTextInput.addEventListener("keyup", validateKeyTextInput);

const encodeTextBox = document.getElementById("encode");
encodeTextBox.addEventListener("keyup", encodeText);
encodeTextBox.addEventListener("keyup", colorEncodedTextBox);

const decodeTextBox = document.getElementById("decode");
decodeTextBox.addEventListener("keyup", decodeText);
decodeTextBox.addEventListener("keyup", colorDecodedTextBox);

// TASK #3: Add event handlers for cypher key, encode, and decode text boxes.
//   Every time the user types in a character, the cypher key and the
//   encoded/decoded text boxes should have their state saved.
// const encodedTextBox = document.getElementById("encoded");
// const decodedTextBox = document.getElementById("decoded");
keyTextInput.addEventListener("keyup", saveState);
encodeTextBox.addEventListener("keyup", saveState);
decodeTextBox.addEventListener("keyup", saveState);
// encodedTextBox.addEventListener("keyup", saveState);
// decodedTextBox.addEventListener("keyup", saveState);
// TASK #3: Add an event handler for the clear button.
//   When the user clicks the clear button, the state should be cleared.
document.getElementById("clear-state").addEventListener("click", clearState);
// TASK #3: Call restoreState() to restore the state of the text boxes.
//   This will restore the state of the app when loaded/reloaded.
restoreState();


function saveState() {
  // TASK #3: Save the state of the cypher key, encode, and decode text boxes.
  //   Use the localStorage object to store the state. Make sure you use
  //   JSON.stringify() to convert the state to a string.
  localStorage.setItem("key", JSON.stringify(keyTextInput.value));
  localStorage.setItem("encode", JSON.stringify(encodeTextBox.value));
  localStorage.setItem("decode", JSON.stringify(decodeTextBox.value));
  // localStorage.setItem("encoded", JSON.stringify(encodedTextBox.value));
  // localStorage.setItem("decoded", JSON.stringify(decodedTextBox.value));
  
}

function restoreState() {
  // Restore the state of the cypher key text input
  const keyText = localStorage.getItem("key");
  keyTextInput.value = keyText ? JSON.parse(keyText) : '';

  // Restore the state of the encode text box
  const encodeTextValue = localStorage.getItem("encode");
  encodeTextBox.value = encodeTextValue ? JSON.parse(encodeTextValue) : '';

  // Restore the state of the decode text box
  const decodeTextValue = localStorage.getItem("decode");
  decodeTextBox.value = decodeTextValue ? JSON.parse(decodeTextValue) : '';

  // Update the decoder cipher key
  decoder.cipher = keyTextInput.value;

  // Trigger encoding and decoding to update the encoded and decoded text boxes
  encodeText();
  decodeText();

  // Update the colors of the text boxes
  colorEncodedTextBox();
  colorDecodedTextBox();
}




function clearState() {
  // TASK #3: Clear the state of the cypher key, encode, and decode text boxes.
  //   Use the localStorage object to clear the state. You can use the
  //   remoteItem() method to clear the state.
  localStorage.removeItem("key");
  localStorage.removeItem("encode");
  localStorage.removeItem("decode");
  // localStorage.removeItem("encoded");
  // localStorage.removeItem("decoded");
  
}

/**
 * Validate the cipher key text input.
 */
function validateKeyTextInput() {
  if (
    keyTextInput.value !== keyTextInput.value.toLowerCase() ||
    keyTextInput.value.length !== 26
  ) {
    keyTextInput.style.backgroundColor = "yellow";
  } else {
    keyTextInput.style.backgroundColor = "white";
    decoder.cipher = keyTextInput.value;
    encodeText();
    decodeText();
  }
}

/**
 * Color the encoded text box.
 */
function colorEncodedTextBox() {
  const encodedTextBox = document.getElementById("encoded");
  if (encodedTextBox.value.length === 0) {
    encodedTextBox.style.color = "black";
    encodedTextBox.style.backgroundColor = "white";
  } else {
    encodedTextBox.style.color = "white";
    encodedTextBox.style.backgroundColor = "red";
  }
}

/**
 * Encode the text in the encode text box.
 */
function encodeText() {
  const encodeTextBox = document.getElementById("encode");
  const encodedTextBox = document.getElementById("encoded");
  encodedTextBox.value = decoder.encode(encodeTextBox.value);
}

/**
 * Color the decoded text box.
 */
function colorDecodedTextBox() {
  const decodedTextBox = document.getElementById("decoded");
  if (decodedTextBox.value.length === 0) {
    decodedTextBox.style.color = "black";
    decodedTextBox.style.backgroundColor = "white";
  } else {
    decodedTextBox.style.color = "white";
    decodedTextBox.style.backgroundColor = "green";
  }
}

/**
 * Decode the text in the decode text box.
 */
function decodeText() {
  const decodeTextBox = document.getElementById("decode");
  const decodedTextBox = document.getElementById("decoded");
  decodedTextBox.value = decoder.decode(decodeTextBox.value);
}
