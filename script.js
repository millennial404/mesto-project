// Переменные
// POPUPS-------------------------------------------------------------
const profilePopup = document.querySelector('.popup_edit-profile');
const cardPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');
// -------------------------------------------------------------------
// Кнопки редактирования на главной странице
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfilePopup = document.querySelector('.popup__close');
//Значения имени и профессии на странице
let nameProfile = document.querySelector('.profile__name').textContent;
let professionProfile = document.querySelector('.profile__profession').textContent;
// Поля ввода Имени и профессии
const formInputName = document.querySelector('[name="name"]');
const formInputProfession = document.querySelector('[name="profession"]');

// Кнопка "Сохранить в POPUPе редактирования профиля"
const buttonSaveProfilePopup = document.querySelector('[name="save_profile"]');

// Функции открытия и закрытия POPUP// ------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
// -------------------------------------------------------------------
// Вставляем имя и профессию в форму для редактирования
formInputName.value = nameProfile;
formInputProfession.value = professionProfile;


// Слушаем события  кнопок редактирования профиля и закрытия окна попапа
buttonEditProfile.addEventListener('click', () => {openPopup(profilePopup)});
buttonCloseProfilePopup.addEventListener('click', () => {closePopup(profilePopup)});

// Функция сохранения имени и профессии из формы в профиль
function saveProfile() {
  nameProfile = formInputName.value;
  professionProfile = professionProfile.value;
  closePopup(profilePopup);
}
function formSubmitHandler (evt) {
  evt.preventDefault();
}
// Останавливаем стандартное событие "перезагрузка страницы при нажатии кнопки Сохранить"
// document.querySelector('.popup__form').addEventListener('submit', (evt) => evt.preventDefault());

// Сохраняем данные из формы при нажатии кнопки Сохранить
buttonSaveProfilePopup.addEventListener('submit', formSubmitHandler);
buttonSaveProfilePopup.addEventListener('submit', saveProfile);

// // ----------------------------------------------------------------------------------------------------------
// //Добавление карточек по умолчанию

// const initialCards = [
//   {
//     name: 'Москва',
//     link: 'https://images.unsplash.com/photo-1641152185456-c916bc799257?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80'
//   },
//   {
//     name: 'Санкт-Петербург',
//     link: 'https://images.unsplash.com/photo-1628533447434-f2f4b344bd46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80'
//   },
//   {
//     name: 'Красная поляна',
//     link: 'https://images.unsplash.com/photo-1547925972-ad174a37ac60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80'
//   },
//   {
//     name: 'Сочи',
//     link: 'https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80'
//   },
//   {
//     name: 'Екатеринбург',
//     link: 'https://images.unsplash.com/photo-1568183113672-bfc2f6c66198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
//   },
//   {
//     name: 'Казань',
//     link: 'https://images.unsplash.com/photo-1631775866694-fe340840cc52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80'
//   }
//   ];

// const imgTemplate = document.querySelector('.popup-image');
// const close_popup_img = imgTemplate.querySelector('.popup-image__close');
// close_popup_img.addEventListener('click', function () {
//   imgTemplate.classList.toggle('popup-image_opened');
// });
// const cardsContainer = document.querySelector('.cards');

// function addCard(nameValue, linkValue) {
//   const cardElement = document.createElement('li');
//   cardElement.classList.add('card');

//   const cardImageElement = document.createElement('img');
//   cardImageElement.classList.add('card__image');
//   cardImageElement.setAttribute('src', linkValue);

//   const cardBinElement = document.createElement('button');
//   cardBinElement.classList.add('card__mini-bin');
//   cardBinElement.setAttribute('type', 'button');

//   const cardBottomElement = document.createElement('div');
//   cardBottomElement.classList.add('card__bottom');

//   const cardNameElement = document.createElement('h2');
//   cardNameElement.classList.add('card__caption');
//   cardNameElement.textContent = nameValue;

//   const cardLikeElement = document.createElement('button');
//   cardLikeElement.classList.add('card__like');
//   cardLikeElement.setAttribute('type', 'button');

//   cardBottomElement.append(cardNameElement, cardLikeElement);
//   cardElement.append(cardImageElement, cardBinElement, cardBottomElement);
//   cardsContainer.prepend(cardElement);

//   cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('card__like_status_active');
//   });

//   const deleteButton = cardElement.querySelector('.card__mini-bin');

//   deleteButton.addEventListener('click', function () {
//     const listItem = deleteButton.closest('.card');
//     listItem.remove();
//   });

//   cardImageElement.addEventListener('click', function () {
//     imgTemplate.classList.toggle('popup-image_opened');
//     imgTemplate.querySelector('.popup-image__img').setAttribute('src', cardImageElement.getAttribute('src'));
//     imgTemplate.querySelector('.popup-image__caption').textContent = nameValue;
//   });
// }


// initialCards.forEach((elem) => addCard(elem.name, elem.link));

// // ----------------------------------------------------------------------------------------------------------
// // Карточкин POPUP
// const popup_add_card = document.querySelector('.popup-add-card');
// const add_button_card = document.querySelector('.profile__add-button');
// const popup_add_card_close = popup_add_card.querySelector('.popup-add-card__close');
// const card_name = document.querySelector('[name="name-card"]');
// const card_img_link = document.querySelector('[name="link-img"]');
// const createButton = popup_add_card.querySelector('.popup-add-card__button');

// function addCardButtonOnOff() {
//   popup_add_card.classList.toggle('popup-add-card_opened');
// }

// function createCard() {
//   if (card_name.value === '' && card_name.value === ''){
//     addCardButtonOnOff();
//   }
//   else{
//   addCard(card_name.value, card_img_link.value)
//   card_name.value = '';
//   card_img_link.value= '';
//   addCardButtonOnOff();
//   }
// }

// add_button_card.addEventListener('click', addCardButtonOnOff);
// popup_add_card_close.addEventListener('click', addCardButtonOnOff);
// createButton.addEventListener('click', createCard)
// popup_add_card.querySelector('.popup-add-card__form').addEventListener('submit', (evt) => evt.preventDefault());
