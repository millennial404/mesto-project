
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards');

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

  cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_status_active');
  });

  cardDelete.addEventListener('click', () => {
    const listItem = cardDelete.closest('.card');
    listItem.remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    imagePopup.querySelector('.popup__img').setAttribute('src', linkValue);
    imagePopup.querySelector('.popup__img').setAttribute('alt', nameValue);
    imagePopup.querySelector('.popup__img-caption').textContent = nameValue;
  });
  return cardElement;
}

//Функция добавления карточки на страницу
function renderCard(name, link) {
  cardContainer.prepend(createCard(name, link));
}

export {createCard, renderCard}
