const container = document.getElementById("container");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const start = document.getElementById("start");
const end = document.getElementById("end");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio");

const prewBtn = document.getElementById("prew");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// music names

const songs = ["with_khalifa", "doston_ergashev"];

// songIndex

let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
  title.textContent = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `music-image/${song}.jpg`;
}

// funksiyalar

// playmusic
function playSong() {
  container.classList.add("play");
  playBtn.innerHTML = `<i class = " fas fa-pause"> <i/>`;
  audio.play();
}

// pausemusic
function pauseSong() {
  container.classList.remove("play");
  playBtn.innerHTML = `<i class = " fas fa-play"> <i/>`;
  audio.pause();
}

// nextmusic

function nextMusic() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  audio.play();
}

// prewmusic
function prewMusic() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  audio.play();
}
// progress
function progrss(e) {
  const duration = e.srcElement.duration;
  const curTime = e.srcElement.currentTime;
  const presenttageWidth = (curTime / duration) * 100;
  progress.style.width = `${presenttageWidth}%`;

  // end time

  let endMinutes = Math.floor(duration / 60);
  let endSecundes = Math.floor(duration % 60);
  end.textContent = `${endMinutes}:${(endSecundes =
    endSecundes < 10 ? "0" + endSecundes : endSecundes)}`;

  // start time
  let startMinutes = Math.floor(curTime / 60);
  let startSecondes = Math.floor(curTime % 60);
  start.textContent = ` ${startMinutes}: ${(startSecondes =
    startSecondes < 10 ? "0" + startSecondes : startSecondes)} `;
}

// setProgress

function setProgress(e) {
  const width = this.clientWidth;
  const widthX = e.offsetX;
  console.log(widthX);
  const duration = audio.duration;
  audio.currentTime = (widthX / width) * duration;
}

// events
playBtn.addEventListener("click", function () {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
nextBtn.addEventListener("click", nextMusic);
prewBtn.addEventListener("click", prewMusic);
audio.addEventListener("timeupdate", progrss);
audio.addEventListener("ended", nextMusic);
progressContainer.addEventListener("click", setProgress);
