import { alphabet } from "./constants/turkish-alphabet.js";

const keyArray = [...document.querySelectorAll(".key")];

/**
 * @description Create audio elements with data-key attribute.
 */
function createAudioElements() {
  alphabet.forEach((letter, index) => {
    keyArray[index].setAttribute("data-key", alphabet[index].key);
    const tempAudioElement = `
    <audio data-key="${letter.key}" src="./assets/sounds/${letter.character}.mp3"></audio>
      `;
    const audiosElement = document.getElementById("audios");
    audiosElement.innerHTML += tempAudioElement;
  });
}

/**
 * @description Play audio for keydown event.
 * @param {Event} event
 */
function playAudioForKeyDown(event) {
  const audioElement = document.querySelector(
    `audio[data-key="${event.keyCode}"]`
  );
  const keyElement = document.querySelector(
    `.key[data-key="${event.keyCode}"]`
  );
  audioElement.currentTime = 0;
  audioElement.play();
  keyElement.classList.add("active");
  setTimeout(() => {
    keyElement.classList.remove("active");
  }, 300);
}

/**
 * @description Play audio for key click.
 */
function playAudioForClick(event) {
  const dataKey = event.srcElement.getAttribute("data-key");
  alphabet.forEach((letter) => {
    if (dataKey == letter.key) {
      const audioElement = document.querySelector(
        `audio[data-key="${letter.key}"]`
      );
      audioElement.currentTime = 0;
      audioElement.play();
    }
  });
}

/**
 * @description Handle click for key.
 */
function clickForKey() {
  keyArray.forEach((key) => {
    key.onclick = function (event) {
      playAudioForClick(event);

      let ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      let x = event.clientX - event.target.offsetLeft;
      let y = event.clientY - event.target.offsetTop;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      setTimeout(() => {
        ripple.remove();
      }, 300);
    };
  });
}

createAudioElements();
clickForKey();
window.addEventListener("keydown", playAudioForKeyDown);
