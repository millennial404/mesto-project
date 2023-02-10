export default class FormValidator {
  constructor(settings, selectorForm) {
    this.settings = settings;
    this.form = document.querySelector(selectorForm);

  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this.form.querySelector(`.${inputElement.id}--error`);
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this.form.querySelector(`.${inputElement.id}--error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = '';
  };

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }


}
