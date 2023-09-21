const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('#openModalBtn');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('.form-btn-cancel');
const body = document.querySelector('body');
const errorDiv = document.querySelector('.error');

function openModal() {
  modal.classList.toggle('hide');
}

openModalBtn.addEventListener('click', openModal);

function showError(message) {
  errorDiv.textContent = message;
}

function validateNumber(number) {
  const numberRegex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  return numberRegex.test(number);
}

function validateEmail(email) {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;;
  return emailRegex.test(email);
}

function validateURL(url) {
  if (url === '') {
    return true;
  }
  const urlRegex = /\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return urlRegex.test(url);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const dataObj = Object.fromEntries(formData);
  const { phone, email, website, vk, ok, facebook, youtube } = dataObj;

  if (!validateEmail(email)) {
    showError('Пожалуйста введите корректный e-mail');
  } else if(!validateNumber(phone)) {
    showError('Пожалуйста введите корректный адрес телефона');    
  } else if (!validateURL(website) || !validateURL(vk) || !validateURL(ok) || !validateURL(facebook) || !validateURL(youtube)) {
    showError('Пожалуйста введите корректный адрес сайта');
  } else {
    showError('');
  }

  if (errorDiv.textContent === '') {
    console.log(`Форма отправлена! Данные: ${JSON.stringify(dataObj)}`);
    modal.classList.add('hide');
  }
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  modal.classList.add('hide');
  showError('');
});
