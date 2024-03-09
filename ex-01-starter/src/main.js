const clickMe = () => {
  const para = document.querySelector("#display");
  para.textContent =
    "Beyond the screen lies a world of adventure, where pixels clash and destinies are forged in 8-bit glory. Press CLICK ME NOT and embark on a quest that legends are made of.";
};

const clickMeNot = () => {
  const para = document.querySelector("#display");
  para.textContent =
    "In the pixelated depths of the digital realm, heroes are not born... they're programmed. Ready your joysticks, for tonight, we conquer the arcade!";
};

// TASK #3: Add the JavaScript code for TASK #3 here.
const clickMeButton = document.querySelector('#click-me');
clickMeButton.addEventListener('click', clickMe);

const clickMeNotButton = document.querySelector('#click-me-not');
clickMeNotButton.addEventListener('click', clickMeNot);