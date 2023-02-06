import Notiflix from 'notiflix';
Notiflix.Notify.init({ position: 'right-top' });

const formPromiseGeneration = document.querySelector('.form');

formPromiseGeneration.addEventListener('submit', onSubmitButton);

function createPromise({ position, delay }) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function onSubmitButton(e) {
  e.preventDefault();
  const step = Number(e.currentTarget.step.value);
  const total = Number(e.currentTarget.amount.value);
  let delay = Number(e.currentTarget.delay.value);
  let position = 1;

  for (let i = 1; i <= total; i++) {
    createPromise({ position, delay })
      .then(onCreatePromiseSuccess)
      .catch(onCreatePromiseError);
    position += 1;
    delay += step;
  }
}

function onCreatePromiseSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onCreatePromiseError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
