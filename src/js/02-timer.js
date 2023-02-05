// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputTimer: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  spanDays: document.querySelector('[data-days]'),
  spanHours: document.querySelector('[data-hours]'),
  spanMinutes: document.querySelector('[data-minutes]'),
  spanSeconds: document.querySelector('[data-seconds]'),
  divTimer: document.querySelector('.timer'),
  arrayDivField: document.querySelectorAll('.field'),
  arraySpanLabel: document.querySelectorAll('.label'),
  arraySpanValue: document.querySelectorAll('.value'),
};

console.log(refs.divContainer);
refs.divTimer.style.display = 'flex';
refs.divTimer.style.gap = '20px';
refs.inputTimer.style.fontSize = '16px';
refs.startBtn.style.fontSize = '16px';

for (const element of refs.arraySpanLabel) {
  element.style.display = 'block';
}

for (const element of refs.arrayDivField) {
  element.style.display = 'block';
}

for (const element of refs.arraySpanValue) {
  element.style.display = 'block';
  element.style.textAlign = 'center';
}

let inputValue = 0;
let intervalId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      refs.startBtn.removeAttribute('disabled');
      inputValue = selectedDates[0].getTime();
    } else {
      refs.startBtn.setAttribute('disabled', true);
      window.alert('Please choose a date in the future');
    }
  },
};

flatpickr(refs.inputTimer, options);

refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onClickStartTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function countDownTimer() {
  const currentTime = Date.now();
  const diff = inputValue - currentTime;
  const { days, hours, minutes, seconds } = convertMs(diff);

  if (diff <= 0) {
    clearInterval(intervalId);
    console.log('Timer stopped');
    refs.startBtn.setAttribute('disabled', true);
    return;
  }

  refs.spanDays.textContent = addZero(days);
  refs.spanHours.textContent = addZero(hours);
  refs.spanMinutes.textContent = addZero(minutes);
  refs.spanSeconds.textContent = addZero(seconds);
}

function onClickStartTimer() {
  intervalId = setInterval(countDownTimer, 1000);
}

function addZero(number) {
  return String(number).padStart(2, 0);
}
