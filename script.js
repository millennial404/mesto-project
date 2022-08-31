// Переменные
const edit_button = document.querySelector('.profile__edit-button');
const popup_close = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const editForm_input_name = document.querySelector('[name="name"]');
const editForm_input_profession = document.querySelector('[name="profession"]');
const popup_button_save = document.querySelector('.popup__button');

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
//Добавление карточек по умолчанию

const initialCards = [
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1641152185456-c916bc799257?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80'
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1628533447434-f2f4b344bd46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80'
  },
  {
    name: 'Красная поляна',
    link: 'https://images.unsplash.com/photo-1547925972-ad174a37ac60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80'
  },
  {
    name: 'Сочи',
    link: 'https://images.unsplash.com/photo-1549092156-04ee20673b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80'
  },
  {
    name: 'Екатеринбург',
    link: 'https://images.unsplash.com/photo-1568183113672-bfc2f6c66198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
  },
  {
    name: 'Казань',
    link: 'https://images.unsplash.com/photo-1631775866694-fe340840cc52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80'
  }
  ];

const imgTemplate = document.querySelector('.popup-image');
const close_popup_img = imgTemplate.querySelector('.popup-image__close');
close_popup_img.addEventListener('click', function () {
  imgTemplate.classList.toggle('popup-image_opened');
});
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

  const deleteButton = cardElement.querySelector('.card__mini-bin');

  deleteButton.addEventListener('click', function () {
    const listItem = deleteButton.closest('.card');
    listItem.remove();
  });

  cardImageElement.addEventListener('click', function () {
    imgTemplate.classList.toggle('popup-image_opened');
    imgTemplate.querySelector('.popup-image__img').setAttribute('src', cardImageElement.getAttribute('src'));
    imgTemplate.querySelector('.popup-image__caption').textContent = nameValue;
  });
}


initialCards.forEach((elem) => addCard(elem.name, elem.link));

// ----------------------------------------------------------------------------------------------------------
// Карточкин POPUP
const popup_add_card = document.querySelector('.popup-add-card');
const add_button_card = document.querySelector('.profile__add-button');
const popup_add_card_close = popup_add_card.querySelector('.popup-add-card__close');
const card_name = document.querySelector('[name="name-card"]');
const card_img_link = document.querySelector('[name="link-img"]');
const createButton = popup_add_card.querySelector('.popup-add-card__button');

function addCardButtonOnOff() {
  popup_add_card.classList.toggle('popup-add-card_opened');
}

function createCard() {
  if (card_name.value === '' && card_name.value === ''){
    addCardButtonOnOff();
  }
  else{
  addCard(card_name.value, card_img_link.value)
  card_name.value = '';
  card_img_link.value= '';
  addCardButtonOnOff();
  }
}

add_button_card.addEventListener('click', addCardButtonOnOff);
popup_add_card_close.addEventListener('click', addCardButtonOnOff);
createButton.addEventListener('click', createCard)
popup_add_card.querySelector('.popup-add-card__form').addEventListener('submit', (evt) => evt.preventDefault());
