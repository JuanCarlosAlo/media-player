const video = document.getElementById('video');
const playerBar = document.getElementById('player-bar');
const rootStyles = document.documentElement.style;

const videoWidth = e => {
  rootStyles.setProperty(
    '--bar-width',
    (e.target.duration / 100) * e.target.currentTime + '%'
  );
};

video.addEventListener('timeupdate', e => {
  videoWidth(e);
});
