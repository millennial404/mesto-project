export default class Card {
  constructor(data, idProfile, templateSelector, callBackFunction) {
    const {likeCard, deleteLikeCard, deleteCard, handleCardClick} = callBackFunction;
    this._likeCard = likeCard;
    this._deleteLikeCard = deleteLikeCard;
    this._deleteCard = deleteCard;
    this._likes = data.likes;
    this._idCard = data._id;
    this._name = data.name;
    this._link = data.link;
    this._ownerId = data.owner._id;
    this._idProfile = idProfile;
    this._countLikes = data.likes.length;
    this._template = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  generate() {
    this._element = this._getElement();
    this._image = this._element.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._countLikesEl = this._element.querySelector(".card__like-count");
    this._element.querySelector(".card__caption").textContent = this._name;
    this._countLikesEl.textContent = this._countLikes;
    this._like = this._element.querySelector(".card__like");
    this._bin = document
      .querySelector("#mini-bin")
      .content.querySelector(".card__mini-bin")
      .cloneNode(true);

    if (this._ownerId === this._idProfile) {
      this._image.after(this._bin);
    }

    if (this._isLiked()) {
      this._like.classList.add("card__like_status_active");
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._bin.addEventListener("click", () => this._deleteCardElement());
    this._like.addEventListener("click", () => this._onOffLike());
    this._image.addEventListener("click", () => this._handleCardClick(this._image.src, this._image.alt));
  }

  _onOffLike() {
    if (!this._like.classList.contains("card__like_status_active")) {
      this._likeCard(this._idCard)
        .then((res) => {
          this._countLikesEl.textContent =
            res.likes.length;
          this._like.classList.add("card__like_status_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._deleteLikeCard(this._idCard)
        .then((res) => {
          this._countLikesEl.textContent =
            res.likes.length;
          this._like.classList.remove("card__like_status_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _deleteCardElement() {
    this._deleteCard(this._idCard)
      .then(() => {
        this._bin.closest('.card').remove()
      })
      .catch((err) => {
        console.log(err);
      })
  }

  _isLiked() {
    let likeStatus = false;
    if (this._likes) {
      this._likes.forEach(el => {
        if (el._id === this._idProfile) {
          likeStatus = true;
        }
      });
    }
    return likeStatus;
  }

  _getElement() {
    this._cardElement = document
      .querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return this._cardElement;
  }
}

