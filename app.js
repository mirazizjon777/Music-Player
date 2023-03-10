const btnPlay = document.querySelector(".play");
const audio = document.querySelector("audio");
const btnNext = document.querySelector(".next");
const btnPrev = document.querySelector(".prev");
const container = document.querySelector(".container");
const image = document.querySelector(".cover");
const title = document.querySelector(".title");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const volume = document.getElementById('volume')

const songs = [
  "INNA - Amazing",
  "Lola Yuldasheva - Toshkent Samarqand",
  "Maroon 5 - Wait",
  "Matrang - заманчивая",
  "The weekend - save your tears",
];
let songIndex = 0;

btnPlay.addEventListener("click", () => {
  if (container.classList.contains("play")) {
    playFunc("play");
  } else {
    playFunc("pause");
  }
});

volume.addEventListener('input', () => {
    audio.volume = volume.value / 10
})

btnNext.addEventListener("click", nextFunc);
btnPrev.addEventListener("click", prevFunc);

audio.addEventListener("timeupdate", timeUpdate);

progressContainer.addEventListener("click", function (e) {
  let duration = audio.duration;
  let offsetX = e.offsetX;
  let width = this.clientWidth;

  audio.currentTime = (offsetX / width) * duration;
});

// Function
function playFunc(onOff) {
  container.classList.toggle("play");
  btnPlay.innerHTML = `<i class="fas fa-${onOff}"></i>`;
  onOff == "play" ? audio.pause() : audio.play();
}

function timeUpdate(e) {
  let currentTime = e.srcElement.currentTime;
  let duration = e.srcElement.duration;

  // start
  let startMin = Math.trunc(currentTime / 60)
    .toString()
    .padStart(2, "0");
  let startSec = Math.trunc(currentTime % 60)
    .toString()
    .padStart(2, "0");
  document.getElementById("start").textContent = `${startMin} : ${startSec}`;

  // end
  let endMin = Math.trunc(duration / 60)
    .toString()
    .padStart(2, "0");
  let endSec = Math.trunc(duration - endMin * 60)
    .toString()
    .padStart(2, "0");
  document.getElementById("end").textContent = `${endMin} : ${endSec}`;

  progress.style.width = `${(currentTime / duration) * 100}%`;
  if (audio.currentTime == audio.duration) {
    nextFunc();
  }
  if (!e.srcElement.duration) {
    document.getElementById("end").textContent = `00 : 00`;
  }
}

function nextFunc() {
  songIndex++;
  songIndex = songIndex > songs.length - 1 ? 0 : songIndex;
  updateFunc();
}

function prevFunc() {
  songIndex--;
  songIndex = songIndex < 0 ? songs.length - 1 : songIndex;
  updateFunc();
}

function updateFunc() {
  audio.src = `musics/${songs[songIndex]}.mp3`;
  image.src = `album/${songs[songIndex]}.jpg`;
  title.textContent = songs[songIndex];
  if (container.classList.contains("play")) {
    audio.play();
  }
}

console.log(progress, progressContainer);
