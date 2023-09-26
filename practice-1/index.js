const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('#openModalBtn');
const form = document.querySelector('form');
const cancelBtn = document.querySelector('.form-btn-cancel');
const body = document.querySelector('body');
const errorDiv = document.querySelector('.error');
const uploadButton = document.getElementById('uploadButton');
const photoInput = document.getElementById('photoInput');
const photoDelete = document.querySelector('.photo-delete-btn');

function openModal() {
  modal.classList.toggle('hide');
}

openModalBtn.addEventListener('click', openModal);

function showError(message) {
  errorDiv.textContent = message;
}

uploadButton.addEventListener('click', (e) => {
  e.preventDefault();
  photoInput.click();
  showError('');
});

photoDelete.addEventListener('click', () => {
  form.elements.photo.value = '';
});

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
  const { email, photo, phone, website, vk, ok, facebook, youtube } = dataObj;

  if (!validateEmail(email)) {
    showError('Пожалуйста введите корректный e-mail');
  } else if (photo.size === 0) {
    showError('Пожалуйста загрузите логотип');
  } else if(!validateNumber(phone)) {
    showError('Пожалуйста введите корректный номер телефона');    
  } else if (!validateURL(website)) {
    showError('Пожалуйста введите корректный адрес сайта');
  } else if (!validateURL(vk)) {
    showError('Пожалуйста введите корректный адрес страницы во Вконтакте');    
  } else if (!validateURL(ok)) {
    showError('Пожалуйста введите корректный адрес страницы в Одноклассниках');    
  } else if (!validateURL(facebook) ) {
    showError('Пожалуйста введите корректный адрес страницы Facebook');
  } else if (!validateURL(youtube)) {
    showError('Пожалуйста введите корректный адрес страницы Youtube');
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
