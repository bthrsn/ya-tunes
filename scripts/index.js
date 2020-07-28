// Порядок, которому следует придерживаться пронумерован

//1. Сначала идут импорты. Это импорты функции запуска радио и остальных
import {
  radioPlayerInit
} from './radioPlayer.js';
import {
  musicPlayerInit
} from './musicPlayer.js';
import {
  videoPlayerInit
} from './videoPlayer.js';

// 2. Потом объявляем переменные
// получаем кнопки
const playerBtn = document.querySelectorAll('.player-btn'),
  // получаем блоки
  playerBlock = document.querySelectorAll('.player-block'),
  // Получим блок заголовка
  temp = document.querySelector('.temp');

// 3. Далее функции
const deactivationPlayer = () => {
  // скрываем блок заголовка
  temp.style.display = 'none';
  playerBtn.forEach(item =>
    item.classList.remove('active'));
  playerBlock.forEach(item =>
    item.classList.remove('active'));
}

// 4. Следом обработчики событий
// Напишем метод: по клику на кнопку открывается ее блок
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
  // функция для удаления остальных открытых плееров
  deactivationPlayer();
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
}));

// 5. И в конце, вызовы функций. В основном это init функции
// Вызов функций запуска радио и прочих
radioPlayerInit();
videoPlayerInit();
musicPlayerInit();