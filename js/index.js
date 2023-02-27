const video = document.getElementById("video");
const playerBar = document.getElementById("player-bar");
const playerBarContainer = document.getElementById("player-bar-container");
const rootStyles = document.documentElement.style;
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const fastFowards = document.getElementById("ff");
const rewind = document.getElementById("rewind");
const volume = document.getElementById("volume");
const speedButton = document.getElementById("speed-button");
const speedList = document.getElementById("speed-list");

const barTime = (e) => {
  video.currentTime = (e.offsetX / e.target.clientWidth) * video.duration;
};

const videoWidth = (e) => {
  rootStyles.setProperty(
    "--bar-width",
    (e.target.currentTime * 100) / e.target.duration + "%"
  );
};
const playAndPause = () => {
  if (video.paused) {
    video.play();
    play.children[0].src = "assets/pause-solid.svg";
  } else {
    play.children[0].src = "assets/play-solid.svg";
    video.pause();
  }
};

const fastFowardsTime = () => {
  video.currentTime += 5;
};
const rewindTime = () => {
  video.currentTime -= 5;
};

const volumeChange = () => {
  video.volume = e.target.value / 100;
};

const speedChange = (e) => {
  console.log(Number(e));
};

video.addEventListener("timeupdate", (e) => {
  videoWidth(e);
});

playerBarContainer.addEventListener("click", (e) => {
  barTime(e);
});

play.addEventListener("click", (e) => {
  playAndPause();
});

fastFowards.addEventListener("click", (e) => {
  fastFowardsTime();
});
rewind.addEventListener("click", (e) => {
  rewindTime();
});

volume.addEventListener("change", (e) => {
  volumeChange();
});

speedButton.addEventListener("click", (e) => {
  speedList.classList.toggle("speed__list--show");
});
speedList.addEventListener("click", (e) => {
  speedChange(e.target.dataset.speed);
});

console.dir(video);
