import '../pages/index.css'; // импорт главного файла стилей
import { initialCards } from './cards.js'; //данные для инициализации первых карточек
import {renderCard } from "./card.js";
import {closePopup, openPropfilePopup, saveProfile, openAddCardPopup } from "./modal.js";
import {enableValidation} from "./validate.js";

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

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup.classList.remove("popup_opened");
  }
});

//Инициализация первых карточек
initialCards.forEach((elem) => renderCard(elem.name, elem.link));

//Добавление новой карточки при нажатии
formAddCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(nameCardPopup.value, linkImgCardPopup.value);
  formAddCardPopup.reset();
  closePopup(cardPopup);
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




