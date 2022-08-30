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


// ----------------------------------------------------------------------------------------------------------
// Карточкин POPUP
const popup_add_card = document.querySelector('.popup-add-card');
const add_button_card = document.querySelector('.profile__add-button');
const popup_add_card_close = popup_add_card.querySelector('.popup__close');
function addCardButtonOnOff() {
  popup_add_card.classList.toggle('popup_opened');
}
add_button_card.addEventListener('click', addCardButtonOnOff);
popup_add_card_close.addEventListener('click', addCardButtonOnOff);
popup_add_card.querySelector('.popup__form').addEventListener('submit', (evt) => evt.preventDefault());
// ----------------------------------------------------------------------------------------------------------
//Добавление карточки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

const cardsContainer = document.querySelector('.cards');
function addCard(nameValue, linkValue) {
  const cardElement = document.createElement('li');
  cardElement.classList.add('card');

  const cardImageElement = document.createElement('img');
  cardImageElement.classList.add('card__image');
  cardImageElement.setAttribute('src', linkValue);

  const cardBinElement = document.createElement('button');
  cardBinElement.classList.add('card__mini-bin');
  cardBinElement.setAttribute('type', 'button');

  const cardBottomElement = document.createElement('div');
  cardBottomElement.classList.add('card__bottom');

  const cardNameElement = document.createElement('h2');
  cardNameElement.classList.add('card__caption');
  cardNameElement.textContent = nameValue;

  const cardLikeElement = document.createElement('button');
  cardLikeElement.classList.add('card__like');
  cardLikeElement.setAttribute('type', 'button');

  cardBottomElement.append(cardNameElement, cardLikeElement);
  cardElement.append(cardImageElement, cardBinElement, cardBottomElement);
  cardsContainer.prepend(cardElement);

  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_status_active');
  });
}

initialCards.forEach((elem) => addCard(elem.name, elem.link));
