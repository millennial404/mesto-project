export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCardPopup = document.querySelector('.profile__add-button');
export const buttonAvaUpdate = document.querySelector('.profile__updateAvaButton');
export const inputNameProfile = document.querySelector('[name="name"]');
export const inputAboutProfile = document.querySelector('[name="profession"]');

export const nameProfile = document.querySelector('.profile__name');

export const professionProfile = document.querySelector('.profile__profession');
export const settingsValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const apiOptions = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: '8e484665-06f6-4a1a-8841-c5612a4870b1',
    'Content-Type': 'application/json'
  }
}
