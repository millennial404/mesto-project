export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._escape = this._handleEscClose.bind(this);
    this._mouse = this._closePopupMouse.bind(this);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this.removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._mouse);
    document.addEventListener('keydown', this._escape);
  }

  removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._mouse);
    document.removeEventListener('keydown', this._escape);
  }

  _closePopupMouse(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

}
