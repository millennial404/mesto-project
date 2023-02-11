import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.image = this._popup.querySelector('.popup__img');
    this.imageCaption = this._popup.querySelector('.popup__img-caption');

  }

  open(linkValue, nameValue) {
    super.open();
    this.image.setAttribute('src', linkValue);
    this.image.setAttribute('alt', nameValue);
    this.imageCaption.textContent = nameValue;
  }

}
