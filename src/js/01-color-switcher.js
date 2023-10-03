const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let idInterval = null; 
const timeInterval = 1000;

stopBtn.disabled = true; 

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;

  stopBtn.disabled = false;

  idInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, timeInterval);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;

  stopBtn.disabled = true;

  clearInterval(idInterval);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}