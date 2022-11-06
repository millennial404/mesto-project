import { openPopup } from "./modal";
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards');
const imagePopup = document.querySelector('.popup_image');
const image = imagePopup.querySelector('.popup__img');

function deleteCard (cardID) {
  const listItem = cardID.closest('.card');
  listItem.remove();
}
function likeCard (evt) {
  evt.target.classList.toggle('card__like_status_active');
}

//Функция создания карточки
function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__caption');
  const cardLike = cardElement.querySelector('.card__like');
  const cardDelete = cardElement.querySelector('.card__mini-bin');

  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardCaption.textContent = nameValue;

  cardLike.addEventListener('click', (evt) => likeCard(evt));

  cardDelete.addEventListener('click', () => deleteCard(cardDelete));

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    image.setAttribute('src', linkValue);
    image.setAttribute('alt', nameValue);
    imagePopup.querySelector('.popup__img-caption').textContent = nameValue;
  });
  return cardElement;
}

//Функция добавления карточки на страницу
function renderCard(name, link) {
  cardContainer.prepend(createCard(name, link));
}

export {createCard, renderCard}
