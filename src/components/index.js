import '../pages/index.css'; // импорт главного файла стилей
import { initialCards } from './cards.js'; //данные для инициализации первых карточек
import {renderCard } from "./card.js";
import {closePopup, openPopup} from "./modal.js";
import {enableValidation, toggleButtonState} from "./validate.js";

// Переменные
const arrPopup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit-profile');
const cardPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCardPopup = document.querySelector('.profile__add-button');
const formPopupProfile = document.querySelector('[name="popup-form-edit-profile"]');
const buttonCloseProfilePopup = document.querySelector('[name="button_close-edit-profile"]');
const buttonCloseAddCardPopup = document.querySelector('[name="button_close-popup_add-card"]');
const formAddCardPopup = document.querySelector('[name="popup__form-addCard"]');
const nameCardPopup = document.querySelector('[name="name-card"]');
const linkImgCardPopup = document.querySelector('[name="link-img"]');
const buttonCloseImagePopup = document.querySelector('[name = "button_close-image"]');
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const formInputName = document.querySelector('[name="name"]');
const formInputProfession = document.querySelector('[name="profession"]');
const buttonSubmitCard = document.querySelector('[name="add_card"]');

// Функция заполнения полей формы редактирования профиля данными установленными в данный момент
function openPropfilePopup() {
  formInputName.value = nameProfile.textContent;
  formInputProfession.value = professionProfile.textContent; //заполняем поля формы
  openPopup(profilePopup) //вызываем функцию для открытия попапа
}

// Функция сохранения имени и профессии из формы в профиль
function saveProfile() {
  nameProfile.textContent = formInputName.value;
  professionProfile.textContent = formInputProfession.value;
}

// Функция открытия POPUPa добавления карточки очистка полей формы
function openAddCardPopup() {
  formAddCardPopup.reset();
  openPopup(cardPopup);
  buttonSubmitCard.disabled = true;
  buttonSubmitCard.classList.add('popup__button_inactive');
}

// Слушаем события кнопок редактирования профиля и закрытия окна попапа
buttonEditProfile.addEventListener('click', openPropfilePopup);
buttonCloseProfilePopup.addEventListener('click', () => { closePopup(profilePopup) });

// Слушаем нажатие кнопки Сохранить
formPopupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfile();
  closePopup(profilePopup)
});

//Слушаем кнопки открытия и закрытия POPAPa добавления карточки
buttonAddCardPopup.addEventListener('click', openAddCardPopup);
buttonCloseAddCardPopup.addEventListener('click', () => { closePopup(cardPopup) });

// Слушаем (крестик) POPUPа с изображением
buttonCloseImagePopup.addEventListener('click', () => { closePopup(imagePopup); });

//Закрытие попапа кликом на фон и клавишей Escape
arrPopup.forEach((el) => {
  el.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(el);
    }
  })
});

//Инициализация первых карточек
initialCards.forEach((elem) => renderCard(elem.name, elem.link));

//Добавление новой карточки при нажатии
formAddCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(nameCardPopup.value, linkImgCardPopup.value);
  formAddCardPopup.reset();
  closePopup(cardPopup);
  buttonSubmitCard.disabled = true;
  buttonSubmitCard.classList.add('popup__button_inactive');
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}
);




