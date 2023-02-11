export default class FormValidator {
  constructor(settings, Form) {
    this.settings = settings;
    this.form = Form;
    this.buttonElement = this.form.querySelector(this.settings.submitButtonSelector);

  }

  resetValidation(){
    this.buttonElement.disabled = true;
    this.buttonElement.classList.add(this.settings.inactiveButtonClass);
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

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.buttonElement.disabled = true;
      this.buttonElement.classList.add(this.settings.inactiveButtonClass);
    } else {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this.form.querySelectorAll(this.settings.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, this.buttonElement);
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
  }

}
