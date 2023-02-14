import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmitForm) {
    super(selectorPopup);
    this._callBackSubmitForm = callBackSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._submit = this._submit.bind(this);
    this._submitBtnText = this._submitButton.textContent
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submit)
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this._submit)
  }

  _submit(evt) {
    evt.preventDefault();
    this.renderLoading(true);
    this._callBackSubmitForm(this._getInputValues())
  }

  close() {
    super.close();
    this._form.reset();
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
    for (const i of this._form.elements) {
      if (i.type === "submit") {
        continue;
      }
      this._values[i.name] = i.value;
    }
    return this._values;
  }

}
