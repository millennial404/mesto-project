export default class Card {
  constructor(data, idProfile, templateSelector, callBackFunction) {
    const { likeCard, deletelikeCard, deleteCard, handleCardClick } =
      callBackFunction;
    this._likeCard = likeCard;
    this._deletelikeCard = deletelikeCard;
    this._deleteCard = deleteCard;
    this.likes = data.likes;
    this.idCard = data._id;
    this.name = data.name;
    this.link = data.link;
    this.ownerId = data.owner._id;
    this.idProfile = idProfile;
    this.countLikes = data.likes.length;
    this.template = templateSelector;
    this.handleCardClick = handleCardClick;
  }

  generate() {
    this._element = this._getElement();
    this.image = this._element.querySelector(".card__image");
    this.image.src = this.link;
    this.image.alt = this.name;
    this._element.querySelector(".card__caption").textContent = this.name;
    this._element.querySelector(".card__like-count").textContent =
      this.countLikes;
    this._like = this._element.querySelector(".card__like");
    this._bin = document
      .querySelector("#mini-bin")
      .content.querySelector(".card__mini-bin")
      .cloneNode(true);

    if (this.ownerId === this.idProfile) {
      this.image.after(this._bin);
    }

    if (this._onLike()) {
      this._like.classList.add("card__like_status_active");
    }

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._bin.addEventListener("click", () =>
      this._deleteCardElement(this.idCard)
    );
    this._like.addEventListener("click", () => this._onOffLike(this.idCard));
    this.image.addEventListener("click", () =>
      this.handleCardClick(this.image.src, this.image.alt)
    );
  }

  _onOffLike(idCard) {
    if (!this._like.classList.contains("card__like_status_active")) {
      this._likeCard(idCard)
        .then((res) => {
          this._element.querySelector(".card__like-count").textContent =
            res.likes.length;
          this._like.classList.add("card__like_status_active");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._deletelikeCard(idCard)
        .then((res) => {
          this._element.querySelector(".card__like-count").textContent =
            res.likes.length;
          this._like.classList.remove("card__like_status_active");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  _deleteCardElement(idCard) {
    this._deleteCard(idCard)
      .then(() => { this._bin.closest('.card').remove() })
  }

  _addMiniBin() {
    const miniBinTemplate = document
      .querySelector('#mini-bin')
      .content
      .querySelector('.card__mini-bin')
      .cloneNode(true);
  }

  _onLike() {
    let likeStatus = false;
    if (this.likes) {
      this.likes.forEach(el => {
        if (el._id === this.idProfile) {
          likeStatus = true;
        };
      });
    }
    return likeStatus;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this.template)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }
}

