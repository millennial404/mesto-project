import '../pages/index.css'; // импорт главного файла стилей
import { renderCard } from "./card.js";
import { closePopup, openPopup } from "./modal.js";
import { enableValidation, toggleButtonState } from "./validate.js";
import { getInitialCards, getProfileData, patchDataProfile, addNewCard, updateAvaProfile } from "./api.js";
import { data } from 'autoprefixer';

// Переменные
const arrPopup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit-profile');
const cardPopup = document.querySelector('.popup_add-card');
const updateAvaProfilePopup = document.querySelector('.popup_updateAva');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCardPopup = document.querySelector('.profile__add-button');
const formPopupProfile = document.querySelector('[name="popup-form-edit-profile"]');
const formAddCardPopup = document.querySelector('[name="popup__form-addCard"]');
const nameCardPopup = document.querySelector('[name="name-card"]');
const linkImgCardPopup = document.querySelector('[name="link-img"]');
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const formInputName = document.querySelector('[name="name"]');
const formInputProfession = document.querySelector('[name="profession"]');
const buttonSubmitCard = document.querySelector('[name="add_card"]');
const avaProfile = document.querySelector('.profile__avatar');
const updateAvaProfileButton = document.querySelector('.profile__updateAvaButton');
const formAvaUpdate = document.querySelector('[name="popup__updateAva"]');
const inputLinkAva = formAvaUpdate.querySelector('[name="link-img"]');
const buttonSubmitAva = formAvaUpdate.querySelector('[name="saveAvaButton"]');
let idProfile = '';

Promise.all([getProfileData(), getInitialCards()])
  .then(([userData, cards]) => {
    // установка данных пользователя
    nameProfile.textContent = userData.name;
    professionProfile.textContent = userData.about;
    avaProfile.src = userData.avatar;
    idProfile = userData._id;
    // отрисовка карточек
    cards.reverse().forEach((el) => {
      renderCard(el.name, el.link, el.owner._id, idProfile, el._id, el.likes.length, el.likes)
    });
  })
  .catch((err) => {
    console.log(err);
  })

// Функция заполнения полей формы редактирования профиля данными установленными в данный момент
function openPropfilePopup() {
  formInputName.value = nameProfile.textContent;
  formInputProfession.value = professionProfile.textContent; //заполняем поля формы
  openPopup(profilePopup) //вызываем функцию для открытия попапа
}

// Функция открытия POPUPa обновления аватарки
function openUpdateAvaPopup() {
  openPopup(updateAvaProfilePopup);
  buttonSubmitAva.disabled = true;
  buttonSubmitAva.classList.add('popup__button_inactive');
}

updateAvaProfileButton.addEventListener('click', openUpdateAvaPopup)

// Функция открытия POPUPa добавления карточки очистка полей формы
function openAddCardPopup() {
  formAddCardPopup.reset();
  openPopup(cardPopup);
  buttonSubmitCard.disabled = true;
  buttonSubmitCard.classList.add('popup__button_inactive');
}

// Слушаем события кнопок редактирования профиля
buttonEditProfile.addEventListener('click', openPropfilePopup);

// Слушаем нажатие кнопки Сохранить данные профиля
formPopupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, evt)
  patchDataProfile(formInputName.value, formInputProfession.value)
    .then((res) => {
      nameProfile.textContent = res.name;
      professionProfile.textContent = res.about;
    })
    .then(() => {closePopup(profilePopup)})
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt))
});

//Слушаем кнопки открытия POPAPa добавления карточки
buttonAddCardPopup.addEventListener('click', openAddCardPopup);

//Закрытие попапов кликом на фон||крестик и клавишей Escape
arrPopup.forEach((el) => {
  el.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(el);
    }
  })
});

//Добавление новой карточки при нажатии Сохранить
formAddCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, evt)
  addNewCard(nameCardPopup.value, linkImgCardPopup.value)
    .then((res) => {
      renderCard(res.name, res.link, res.owner._id, res.owner._id, res._id, res.likes.length, res.likes);
    })
    .then(() => {closePopup(cardPopup)})
    .then(() => formAddCardPopup.reset())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt))
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

formAvaUpdate.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, evt)
  updateAvaProfile(inputLinkAva.value)
    .then((res) => {
      avaProfile.src = res.avatar;
    })
    .then(()=>{closePopup(updateAvaProfilePopup)})
    .then(()=>formAvaUpdate.reset())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt))
});

function renderLoading(isLoading, evt) {
  if (isLoading) {
    evt.submitter.innerHTML = `${evt.submitter.innerHTML}...`.replace(/\s/g, '');
  }
  else {
    evt.submitter.innerHTML = evt.submitter.innerHTML.replace("...", "")
  }
}
