import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateSelect(selectedDates[0]);
  },
};

const datetimePicker = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let selectedDate = null;
let intervalId = null;

flatpickr(datetimePicker, options);



function checkIfDateIsInFuture(date) {
  return date > options.defaultDate;
}

function onDateSelect(date) {
  selectedDate = date;

  if (checkIfDateIsInFuture(date)) {
    buttonStart.disabled = false;
  } else {
    buttonStart.disabled = true;
  }
}

buttonStart.disabled = true;





function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = addLeadingZero(days);
  timerHours.textContent = addLeadingZero(hours);
  timerMinutes.textContent = addLeadingZero(minutes);
  timerSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

buttonStart.addEventListener('click', () => {
  if (intervalId) {
    return;
  }

  buttonStart.disabled = true;
  datetimePicker.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    updateTimer(convertMs(deltaTime));

    if (deltaTime < 1000) {
      clearInterval(intervalId);
      datetimePicker.disabled = false;
      intervalId = null;
    }
  }, 1000);
});