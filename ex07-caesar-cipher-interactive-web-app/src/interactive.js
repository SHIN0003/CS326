// TASK #2: import the decoder class
import { decoder } from "./decoderRingClass.js";

// Create a decoder object.
const d = new decoder("");

// TASK #3: Validate the cipher key text input
function validateKeyTextInput() {
  /* BEGIN_STUDENT
  throw new Error('Function not implemented');
  END_STUDENT */
  let cipher = document.getElementById("key").value
  let flag = true
  for (let c of cipher) {
    if (c == c.toUpperCase()) {
      flag = false
    }
  }
  if (flag) {
    document.getElementById("key").style.backgroundColor = "white"
  }
  else {
    document.getElementById("key").style.backgroundColor = "yellow"
  }
  
}

// TASK #3:  Color the encoded text box.
function colorEncodedTextBox() {
  //if box is empty
  if (document.getElementById("encoded").value.length === 0) {
    document.getElementById("encoded").style.backgroundColor = "white"
    document.getElementById("encoded").style.color = "black"
  }
  else {
    document.getElementById("encoded").style.backgroundColor = "red"
    document.getElementById("encoded").style.color = "white"
    
  }
  /* BEGIN_STUDENT
  throw new Error('Function not implemented');
  END_STUDENT */
}

// TASK #3: Encode the text in the encode text box.
function encodeText() {
  let val = document.getElementById("encode").value
  document.getElementById("encoded").value = d.encode(val)
  
  /* BEGIN_STUDENT
  throw new Error('Function not implemented');
  END_STUDENT */
}

// TASK #3: Color the decoded text box.
function colorDecodedTextBox() {
  if (document.getElementById("decoded").value.length === 0) {
    document.getElementById("decoded").style.backgroundColor = "white"
    document.getElementById("decoded").style.color = "black"
  }
  else {
    document.getElementById("decoded").style.backgroundColor = "green"
    document.getElementById("decoded").style.color = "white"
  }
  /* BEGIN_STUDENT
  throw new Error('Function not implemented');
  END_STUDENT */
}

// TASK #3: Decode the text in the decode text box.
function decodeText() {
  let val = document.getElementById("decode").value
  document.getElementById("decoded").value = d.decode(val)
  /* BEGIN_STUDENT
  throw new Error('Function not implemented');
  END_STUDENT */
}

// TASK #4: Assign event handlers to events. Initialize background color for key
// input.
document.getElementById("key").style.backgroundColor = "yellow"
document.getElementById("key").addEventListener("keyup", validateKeyTextInput)

document.getElementById("encode").addEventListener("keyup", function() {
  encodeText();
  colorEncodedTextBox(); // Call colorEncodedTextBox inside encodeText to update the background color
});

document.getElementById("decode").addEventListener("keyup", function() {
  decodeText();
  colorDecodedTextBox(); // Call colorEncodedTextBox inside encodeText to update the background color
});


