function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
  containerBtn: document.querySelector('.container__button'),
};

refs.containerBtn.style.display = 'flex';
refs.containerBtn.style.justifyContent = 'center';
refs.containerBtn.style.alignItems = 'end';
refs.containerBtn.style.height = '400px';
refs.containerBtn.style.gap = '10px';

refs.stopBtn.setAttribute('disabled', true);
let timerId = null;

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

function onClickStartBtn(e) {
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);
  changeColor();
}

function onClickStopBtn(e) {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
  clearInterval(timerId);
}

function changeColor() {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
