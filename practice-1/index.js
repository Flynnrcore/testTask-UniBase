const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('#openModalBtn');
const form = document.querySelector('form');
const canselBtn = document.querySelector('.form-btn-cansel');
const body = document.querySelector('body');

function openModal() {
  modal.classList.toggle('hide');
  //body.classList.toggle('darker');
}

openModalBtn.addEventListener('click', openModal);

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

canselBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('hide');
  //body.classList.remove('darker');
})
