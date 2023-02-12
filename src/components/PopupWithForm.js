import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmitForm) {
    super(selectorPopup);
    this.callBackSubmitForm = callBackSubmitForm;
    this.form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._inputList = this.form.querySelectorAll('.popup__input')
    this.submit = this.submit.bind(this);
    this._submitBtnText = this._submitButton.textContent
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this.submit)
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.form.removeEventListener('submit', this.submit)
  }

  submit(evt) {
    evt.preventDefault();
    this.renderLoading(true);
    this.callBackSubmitForm(this._getInputValues())
  }

  close() {
    super.close();
    this.form.reset();
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    this._values = {};
    for (const i of this.form.elements) {
      if (i.type === "submit") {
        continue;
      }
      this._values[i.name] = i.value;
    }
    return this._values;
  }

}
