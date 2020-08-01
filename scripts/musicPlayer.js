import {
  addZero
} from './supScript.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio'),
    audioImg = document.querySelector('.audio-img'),
    audioHeader = document.querySelector('.audio-header'),
    audioPlayer = document.querySelector('.audio-player'),
    audioNavigation = document.querySelector('.audio-navigation'),
    audioButtonPlay = document.querySelector('.audio-button__play'),
    audioTimePassed = document.querySelector('.audio-time__passed'),
    audioProgress = document.querySelector('.audio-progress'),
    audioProgressTiming = document.querySelector('.audio-progress__timing'),
    audioTimeTotal = document.querySelector('.audio-time__total'),
    audioVolume = document.querySelector('.audio-volume'),
    audioMute = document.querySelector('.audio-mute');

  // Так как Бэкенда нет - все файлы из папки аудио получаем вручную
  const playlist = ['hello', 'flow', 'speed'];

  // переменная для mute звука
  let prevVolume = 0.5;

  // Переменная для номера трека
  let trackIndex = 0;

  // Функция загрузки песен
  const loadTrack = () => {
    const isPlayed = audioPlayer.paused;
    const track = playlist[trackIndex];
    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    if (isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  }

  // функция для переключения треков назад
  const prevTrack = () => {
    if (trackIndex) {
      trackIndex--;
    } else {
      trackIndex = playlist.length - 1;
    }
    loadTrack();
  };

  // функция для переключения треков вперед
  const nextTrack = () => {
    if (trackIndex === playlist.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
    loadTrack();
  };


  audioNavigation.addEventListener('click', event => {
    const target = event.target;

    if (target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');

      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
      const track = playlist[trackIndex];
      audioHeader.textContent = track.toUpperCase();
    }

    if (target.classList.contains('audio-button__prev')) {

      prevTrack();
    }
    if (target.classList.contains('audio-button__next')) {
      nextTrack();
    }
  });

  // когда трек закончился, переключать на следующий
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  // Добавим возможность переключения времени трека
  // Все как в видео
  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    audioProgressTiming.style.width = progress + '%';

    const minutesPassed = Math.floor(currentTime / 60) || '0';
    const secondPassed = Math.floor(currentTime % 60) || '0';

    const minutesTotal = Math.floor(duration / 60) || '0';
    const secondTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`
    audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondTotal)}`
  });

  // переключение времени трека по прогресс бару
  audioProgress.addEventListener('click', event => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
  });

  // обработчик событий на звук
  audioVolume.addEventListener('input', () => {
    audioPlayer.volume = audioVolume.value / 100;
    prevVolume = audioPlayer.volume;
  });
  // обработчик событий на mute звука
  audioMute.addEventListener('click', () => {
    if (audioPlayer.volume) {
      prevVolume = audioPlayer.volume;
      audioPlayer.volume = 0;
    } else {
      audioPlayer.volume = prevVolume;
    }
  })

  // добавляем метод для отключения этого плеера, когда другие плееры активны
  musicPlayerInit.stop = () => {
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      audio.classList.remove('play');
      audioButtonPlay.classList.remove('fa-pause');
      audioButtonPlay.classList.add('fa-play');
    }
  }
}