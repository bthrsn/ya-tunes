// Экспорт функции запуска
export const radioPlayerInit = () => {

  const radio = document.querySelector('.radio'),
    radioNavigation = document.querySelector('.radio-navigation'),
    radioHeaderBig = document.querySelector('.radio-header__big'),
    radioCoverImg = document.querySelector('.radio-cover__img'),
    radioItem = document.querySelectorAll('.radio-item'),
    radioStop = document.querySelector('.radio-stop'),
    radioVolume = document.querySelector('.radio-volume'),
    radioMute = document.querySelector('.radio-mute');

  // переменная для mute звука
  let prevVolume = 0.5;

  // Конструктор аудио - новая функция audio
  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  // функция изменения иконки плея
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-stop');
    }
  }

  // Функция для выделения текущей радиостанции
  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  }

  // обработчик событий на звук
  radioVolume.addEventListener('input', () => {
    audio.volume = radioVolume.value / 100;
    prevVolume = audio.volume;
  });
  // обработчик событий на mute звука
  radioMute.addEventListener('click', () => {
    if (audio.volume) {
      prevVolume = audio.volume;
      audio.volume = 0;
    } else {
      audio.volume = prevVolume;
    }
  })

  // Получаем путь через делегирование
  radioNavigation.addEventListener('change', event => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    // Меняем заголовок на текущую радиостанцию
    const title = parent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    // Меняем изображение на текущую радиостанцию
    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;
    audio.src = target.dataset.radioStation;
    audio.play();
    changeIconPlay();
  });

  // Останавливаем музыку
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  })
}