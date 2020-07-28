export const videoPlayerInit = () => {
  // video-player
  // video-button__play
  // video-button__stop
  // video-progress
  // video-time__passed
  // video-time video-time__total

  const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoTimeTotal = document.querySelector('.video-time__total');

  // функция для смены иконок на паузе и на плее
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  }

  // функция для паузы и плея
  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
    toggleIcon();
  }

  // обработчик событий на самом видео плеере
  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);


}