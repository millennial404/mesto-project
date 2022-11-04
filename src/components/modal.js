
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');
const profilePopup = document.querySelector('.popup_edit-profile');
const formAddCardPopup = document.querySelector('[name="popup__form-addCard"]');
const formInputName = document.querySelector('[name="name"]');
const formInputProfession = document.querySelector('[name="profession"]');
const cardPopup = document.querySelector('.popup_add-card');

// Функции открытия и закрытия POPUP// ------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
// -------------------------------------------------------------------

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
}

export {openPopup, closePopup, openPropfilePopup, saveProfile, openAddCardPopup}
