'use strict';

const form = document.querySelector('.js-form');
const input = document.querySelector('.js-input');
const alert = document.querySelector('.js-alert');
let msg, overlay, close;

// Functions
const validateEmail = function (email) {
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return regexEmail.test(email);
};

const showMessage = function () {
  const html = `
    <div class="modal">
      <p class="modal__message">Thank you for subscribe!</p>
      <button class="modal__close">Close</button>
    </div>
    <div class="overlay"></div>
  `;

  document.querySelector('main').insertAdjacentHTML('beforeend', html);

  msg = document.querySelector('.modal');
  overlay = document.querySelector('.overlay');
  close = document.querySelector('.modal__close');
};

const closeMessage = function () {
  document.querySelector('main').removeChild(msg);
  document.querySelector('main').removeChild(overlay);
  input.value = '';
  form.firstElementChild.removeAttribute('disabled');
  form.lastElementChild.removeAttribute('disabled');

  window.removeEventListener('keydown', handleKeypress);
};

const handleKeypress = function (e) {
  if (e.key === 'Escape') closeMessage();
};

// Event handler
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = input.value;
  form.dataset.status = validateEmail(email) ? 'valid' : 'invalid';

  if (form.dataset.status === 'valid') {
    showMessage();

    alert.textContent = '';

    form.firstElementChild.setAttribute('disabled', true);
    form.lastElementChild.setAttribute('disabled', true);
    close.focus();

    close.addEventListener('click', closeMessage);
    overlay.addEventListener('click', closeMessage);
    window.addEventListener('keydown', handleKeypress);
  } else {
    alert.textContent = 'Please provide a valid email';
  }
});
