import { openPopup } from "./modal";
import { deleteCardServer, likeCardServer, deleteLikeCardServer } from "./api.js";
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards');
const imagePopup = document.querySelector('.popup_image');
const image = imagePopup.querySelector('.popup__img');
const imageCaption = imagePopup.querySelector('.popup__img-caption');
const miniBinTemplate = document.querySelector('#mini-bin').content;

function deleteCard(cardDelete, cardID) {
  deleteCardServer(cardID).then(() => {
    cardDelete.closest('.card').remove();
  })
    .catch((err) => {
      console.log(err);
    })
}

function likeCard(evt, cardID) {
  if (!evt.target.classList.contains('card__like_status_active')) {
    likeCardServer(cardID)
      .then((res) => {
        evt.target.closest(".card").querySelector('.card__like-count').textContent = res.likes.length;
        evt.target.classList.add('card__like_status_active');
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    deleteLikeCardServer(cardID)
      .then((res) => {
        evt.target.closest(".card").querySelector('.card__like-count').textContent = res.likes.length;
        evt.target.classList.remove('card__like_status_active');
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

//Проверка постановки лайка
export const onLike = (likes, idProfile) => {
  let likeStatus = false;
  if (likes) {
    likes.forEach(element => {
      if (element._id === idProfile) {
        likeStatus = true;
      };
    });
  }
  return likeStatus;
};

//Функция создания карточки
function createCard(nameValue, linkValue, ownerId, idProfile, idCard, countLikes, likes) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__caption');
  const cardLike = cardElement.querySelector('.card__like');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardCaption.textContent = nameValue;
  cardLikeCount.textContent = countLikes;
  cardLike.addEventListener('click', (evt) => likeCard(evt, idCard));

  if (ownerId === idProfile) {
    cardImage.after(miniBinTemplate.cloneNode(true));
    const cardDelete = cardElement.querySelector('.card__mini-bin');
    cardDelete.addEventListener('click', () => deleteCard(cardDelete, idCard));
  };

  if (onLike(likes, idProfile)) {
    cardLike.classList.add('card__like_status_active');
  };

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    image.setAttribute('src', linkValue);
    image.setAttribute('alt', nameValue);
    imageCaption.textContent = nameValue;
  });
  return cardElement;
}

//Функция добавления карточки на страницу
function renderCard(name, link, ownerId, idProfile, idCard, countLikes = 0, likes) {
  cardContainer.prepend(createCard(name, link, ownerId, idProfile, idCard, countLikes, likes));
}

export { createCard, renderCard }
