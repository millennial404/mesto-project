import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._image = this._popup.querySelector('.popup__img');
    this._imageCaption = this._popup.querySelector('.popup__img-caption');

  }

  open(linkValue, nameValue) {
    super.open();
    this._image.setAttribute('src', linkValue);
    this._image.setAttribute('alt', nameValue);
    this._imageCaption.textContent = nameValue;
  }

}
