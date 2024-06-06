import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

const formData = {
  email: '',
  message: '',
};

// Функція для зберігання стану форми в локальному сховищі
function saveFormStateToLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Функція для заповнення полів форми зі збереженого стану
function fillFormFieldsFromLocalStorage() {
  const storedState = localStorage.getItem('feedback-form-state');

  if (storedState) {
    const savedData = JSON.parse(storedState);
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
}

// Функція для оновлення formData та збереження в локальне сховище
function updateFormData(event) {
  formData[event.target.name] = event.target.value.trim();
  saveFormStateThrottled();
}

// Використовуємо throttle для обмеження збереження стану форми
const saveFormStateThrottled = throttle(saveFormStateToLocalStorage, 500);

// Відстеження події input на полях форми з обмеженням
feedbackForm.addEventListener('input', updateFormData);

// Перевірка стану сховища при завантаженні сторінки
fillFormFieldsFromLocalStorage();

// Обробка події submit форми
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form Data:', formData);

  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  feedbackForm.reset();
});
