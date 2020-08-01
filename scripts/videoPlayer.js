import {
  addZero
} from './supScript.js';

export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    videoFullscreen = document.querySelector('.video-fullscreen'),
    videoVolume = document.querySelector('.video-volume');

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

  // функция для стопа
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
  }

  // обработчик событий на звук
  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
  });
  // Чтобы сразу ползунок был на половине
  videoPlayer.volume = 0.5;
  // чтобы ползунок находился там, где был изначально
  videoVolume.value = videoPlayer.volume * 100;

  // oбработчик событий на фулскрин
  // requestFullscreen раотает в сафари и файерфоксе
  // webkitEnterFullScreen в хроме
  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  })

  // обработчик событий на самом видео плеере
  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  // обработчик событий для времени
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    // отобразим прогресс
    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;

  });

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  })


}