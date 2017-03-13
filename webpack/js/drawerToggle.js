/* eslint-env browser */
const drawer = document.getElementById('drawer');
const toggle = document.getElementById('toggle');
const obfucator = document.getElementById('obfucator');

toggle.addEventListener('click', () => {
  drawer.classList.toggle('drawer__visible');
  obfucator.classList.toggle('obfucator__visible');
});

obfucator.addEventListener('click', () => {
  drawer.classList.toggle('drawer__visible');
  obfucator.classList.toggle('obfucator__visible');
});
