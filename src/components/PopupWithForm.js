import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmitForm) {
    super(selectorPopup);
    this.callBackSubmitForm = callBackSubmitForm;
    this.form = this.popup.querySelector('.popup__form');
    this.submitButton = this.popup.querySelector('.popup__button');
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this.callBackSubmitForm(this._getInputValues())
    })
  }

  close() {
    super.close();
    this.form.reset();
  }

  renderLoading(isLoading) {

    if (isLoading) {
      this.submitButton.textContent = `${this.submitButton.textContent}...`.replace(/\s/g, '');
    }
    else {
      this.submitButton.textContent = this.submitButton.textContent.replace("...", "")
    }
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
