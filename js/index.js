const LS = localStorage;
const video = document.getElementById('video');
const playerBar = document.getElementById('player-bar');
const playerBarContainer = document.getElementById('player-bar-container');
const rootStyles = document.documentElement.style;
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const fastFowards = document.getElementById('ff');
const rewind = document.getElementById('rewind');
const volume = document.getElementById('volume');
const speedButton = document.getElementById('speed-button');
const speedList = document.getElementById('speed-list');
const videoTimeElement = document.getElementById('video-time');
const modal = document.getElementById('modal');

const modalText = [
  {
    text: 'Paused',
    src: 'assets/pause-solid.svg'
  },
  {
    text: '+5s',
    src: 'assets/forward-solid.svg'
  },
  {
    text: '-5s',
    src: 'assets/backward-solid.svg'
  },
  {
    text: 'Play',
    src: 'assets/play-solid.svg'
  },
  {
    src: 'assets/volume-high.svg'
  },
  {
    src: 'assets/volume-low.svg'
  }
];

const showModal = (text, src) => {
  modal.classList.add('video__modal--show');
  modal.children[1].textContent = text;
  modal.children[0].src = src;
  const timeoutId = setTimeout(() => {
    modal.classList.remove('video__modal--show');
    clearInterval(timeoutId);
  }, 500);
};

const barTime = e => {
  video.currentTime = (e.offsetX / e.target.clientWidth) * video.duration;
};
const localCurrentTimeVideo = () => {
  video.currentTime = LS.getItem('localCurrentTime');
};
const videoCurrentTime = e => {
  LS.setItem('localCurrentTime', e.target.currentTime);
  const dateTotal = new Date(null);
  dateTotal.setSeconds(e.target.currentTime);
  const finalResult = dateTotal.toISOString().slice(14, 19);

  videoTimeElement.children[0].textContent = finalResult;
};
const videoDurationTime = e => {
  const dateTotal = new Date(null);
  dateTotal.setSeconds(e.target.duration);
  const finalResult = dateTotal.toISOString().slice(14, 19);
  videoTimeElement.children[1].textContent = finalResult;
};
const videoWidth = e => {
  rootStyles.setProperty(
    '--bar-width',
    (e.target.currentTime * 100) / e.target.duration + '%'
  );
};
const playAndPause = () => {
  if (video.paused) {
    video.play();
    play.children[0].src = 'assets/pause-solid.svg';
    showModal(modalText[3].text, modalText[3].src);
  } else {
    play.children[0].src = 'assets/play-solid.svg';
    video.pause();
    showModal(modalText[0].text, modalText[0].src);
  }
};

const fastFowardsTime = () => {
  video.currentTime += 5;
  showModal(modalText[1].text, modalText[1].src);
};
const rewindTime = () => {
  video.currentTime -= 5;
  showModal(modalText[2].text, modalText[2].src);
};

const volumeChange = e => {
  video.volume = e.target.value / 100;
  showModal();
};

const speedChange = e => {
  console.log(Number(e));
  video.playbackRate = Number(e);
  showModal();
};

video.addEventListener('timeupdate', e => {
  videoWidth(e);
  videoDurationTime(e);
  videoCurrentTime(e);
});

playerBarContainer.addEventListener('click', e => {
  barTime(e);
});

play.addEventListener('click', e => {
  playAndPause();
  showModal();
});

fastFowards.addEventListener('click', e => {
  fastFowardsTime();
  showModal();
});
rewind.addEventListener('click', e => {
  rewindTime();
  showModal();
});

volume.addEventListener('change', e => {
  volumeChange(e);
});

speedButton.addEventListener('click', e => {
  speedList.classList.toggle('speed__list--show');
});
speedList.addEventListener('click', e => {
  speedChange(e.target.dataset.speed);
  showModal();
});

window.addEventListener('keyup', e => {
  if (e.code === 'Space') {
    playAndPause();
  } else if (e.code === 'ArrowLeft') {
    rewindTime();
  } else if (e.code === 'ArrowRight') {
    fastFowardsTime();
  }
});
window.addEventListener('load', e => {
  localCurrentTimeVideo();
});
console.dir(video);
