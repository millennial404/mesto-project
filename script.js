// Переменные
let edit_button = document.querySelector('.profile__edit-button');
let popup_close = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let editForm_input_name = document.querySelector('[name="name"]');
let editForm_input_profession = document.querySelector('[name="profession"]');
let popup_button_save = document.querySelector('.popup__button');

// Функция переключения попапа вкл выкл
function popup_profile() {
  popup.classList.toggle('popup_opened');
  // Вставляем имя и профессию в форму для редактирования
  editForm_input_name.value = document.querySelector('.profile__name').textContent;
  editForm_input_profession.value = document.querySelector('.profile__profession').textContent;
}

// Слушаем события  кнопок редактирования профиля и закрытия окна попапа
edit_button.addEventListener('click', popup_profile);
popup_close.addEventListener('click', popup_profile);

// Функция сохранения имени и профессии из формы в профиль
function saveProfile() {
  document.querySelector('.profile__name').textContent = editForm_input_name.value;
  document.querySelector('.profile__profession').textContent = editForm_input_profession.value;
  popup_profile();
}

// Останавливаем стандартное событие "перезагрузка страницы при нажатии кнопки Сохранить"
document.querySelector('.popup__form').addEventListener('submit', (evt) => evt.preventDefault());

// Сохраняем данные из формы при нажатии кнопки Сохранить
popup_button_save.addEventListener('click', saveProfile);
