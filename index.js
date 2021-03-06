let playImage = document.getElementById("play-image");
let pauseImage = document.getElementById("pause-image");
let timeDisplay = document.getElementById("time-display");
let word1Display = document.getElementById("word1-display");
let word2Display = document.getElementById("word2-display");
let word3Display = document.getElementById("word3-display");

let seconds = 0;
let isPaused = true;
let timer = window.setInterval(function() {
  if(!isPaused) {
    seconds++;
    updateTime();
  }
}, 1000);

refresh();

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 32) { //spacebar
    timerToggle();
  } else if (event.keyCode === 82) { //r
    refresh();
  }
});

function refresh() {
  rewind();

  //watchout4snakes endpoint is weird
  fetchWord(word1Display, () => { fetchWord(word2Display, () => fetchWord(word3Display)) });
}

function rewind() {
  pause();
  seconds = 0;
  updateTime();
}

function timerToggle() {
  isPaused ? play() : pause();
}

function play() {
  isPaused = false;
  playImage.style.display = "none";
  pauseImage.style.display = "block";
}

function pause() {
  isPaused = true;
  playImage.style.display = "block";
  pauseImage.style.display = "none";
}

function updateTime() {
  timeDisplay.innerHTML = formatTime(seconds);
  if (seconds < 60) {
    timeDisplay.style.background = "lightblue";
  } else if (seconds < 90) {
    timeDisplay.style.background = "lightgreen";
  } else if (seconds < 120) {
    timeDisplay.style.background = "khaki";
  } else {
    timeDisplay.style.background = "tomato";
  }
}

function formatTime(seconds) {
  return Math.floor(seconds/60) + ":" + (seconds % 60 < 10 ? "0" : "") + (seconds % 60);
}

function fetchWord(element, callback) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://hellosnake.cfapps.io/snake", true);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      element.innerHTML = xhttp.responseText;
      if (callback) {
        callback();
      }
    }
  };

  xhttp.send();
}