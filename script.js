import { alphabet } from "./constants/turkish-alphabet.js";

const keys = document.querySelectorAll(".key");
const keyArray = Array.from(keys);

/**
 * Ripple Click Effect For Keys
 */
keyArray.forEach((key) => {
  key.onclick = function (event) {
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

/**
 * Create "data-key" Attributes & Audio Elements
 */
alphabet.forEach((item, index) => {
  keyArray[index].setAttribute("data-key", alphabet[index].key);
  let temporaryAudio = `
  <audio data-key="${item.key}" src="./assets/sounds/${item.character}.mp3"></audio>
    `;
  document.getElementById("audios").innerHTML += temporaryAudio;
});

/**
 * Play Audio With "data-key" Attributes
 */
function playAudioForKeyDown(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add("active");
  setTimeout(() => {
    key.classList.remove("active");
  }, 200);
}

function playAudioForClick() {
  let dataKey = this.getAttribute("data-key");
  alphabet.forEach((item) => {
    if (dataKey == item.key) {
      const audio = document.querySelector(`audio[data-key="${item.key}"]`);
      if (!audio) return;
      audio.currentTime = 0;
      audio.play();
    }
  });
}

/**
 * Listen Click For Keys
 */
keys.forEach((key) => {
  key.addEventListener("click", playAudioForClick);
});

/**
 * Listen Keydown For Window Object
 */
window.addEventListener("keydown", playAudioForKeyDown);
