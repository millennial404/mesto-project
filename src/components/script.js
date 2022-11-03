import {initialCards} from './cards.js';
// Переменные
// POPUPS-------------------------------------------------------------
const arrPopup = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_edit-profile');
const cardPopup = document.querySelector('.popup_add-card');
const imagePopup = document.querySelector('.popup_image');

// -------------------------------------------------------------------
// Кнопки редактирования на главной странице
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCardPopup = document.querySelector('.profile__add-button');

//Значения имени и профессии на странице
const nameProfile = document.querySelector('.profile__name');
const professionProfile = document.querySelector('.profile__profession');

// Форма и поля ввода Имени и профессии
const formPopupProfile = document.querySelector('[name="popup-form-edit-profile"]');
const formInputName = document.querySelector('[name="name"]');
const formInputProfession = document.querySelector('[name="profession"]');

// Кнопки в POPUPе редактирования профиля"
const buttonCloseProfilePopup = document.querySelector('[name="button_close-edit-profile"]');
const buttonSaveProfilePopup = document.querySelector('[name="save_profile"]');

// Кнопки в POPUPе создания карточки"
const buttonCloseAddCardPopup = document.querySelector('[name="button_close-popup_add-card"]');
const buttonSaveAddCardPopup = document.querySelector('[name="add_card"]');

// Форма и поля ввода в POPUPе создания карточки
const formAddCardPopup = document.querySelector('[name="popup__form-addCard"]');
const nameCardPopup = document.querySelector('[name="name-card"]');
const linkImgCardPopup = document.querySelector('[name="link-img"]');

// Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
const cardContainer = document.querySelector('.cards');

// Кнопка закрытия (крестик) POPUPа с изображением
const buttonCloseImagePopup = document.querySelector('[name = "button_close-image"]');

// Функции открытия и закрытия POPUP// ------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
// -------------------------------------------------------------------
// Вставляем имя и профессию в форму для редактирования
function openPropfilePopup() {
  formInputName.value = nameProfile.textContent;
  formInputProfession.value = professionProfile.textContent; //заполняем поля формы
  openPopup(profilePopup) //вызываем функцию для открытия попапа
  }

// Функция открытия POPUPa добавления карточки очистка полей формы
function openAddCardPopup() {
  formAddCardPopup.reset();
  openPopup(cardPopup);
}

// Слушаем события  кнопок редактирования профиля и закрытия окна попапа
buttonEditProfile.addEventListener('click', openPropfilePopup);
buttonCloseProfilePopup.addEventListener('click', () => {closePopup(profilePopup)});

// Функция сохранения имени и профессии из формы в профиль
function saveProfile() {
  nameProfile.textContent = formInputName.value;
  professionProfile.textContent = formInputProfession.value;
}
// Сохраняем данные из формы при нажатии кнопки Сохранить
formPopupProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  saveProfile();
  closePopup(profilePopup)
});

// ----------------------------------------------------------------------------------------------------------
//Слушаем кнопки открытия и закрытия POPAPa добавления карточки
buttonAddCardPopup.addEventListener('click', openAddCardPopup);
buttonCloseAddCardPopup.addEventListener('click', () => {closePopup(cardPopup)});

// ----------------------------------------------------------------------------------------------------------
//Функция создания карточки
function createCard(nameValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardCaption = cardElement.querySelector('.card__caption');
  const cardLike = cardElement.querySelector('.card__like');
  const cardDelete = cardElement.querySelector('.card__mini-bin');

  cardImage.src = linkValue;
  cardImage.alt = nameValue;
  cardCaption.textContent  = nameValue;

  cardLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_status_active');
  });

  cardDelete.addEventListener('click', () => {
    const listItem = cardDelete.closest('.card');
    listItem.remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    imagePopup.querySelector('.popup__img').setAttribute('src', linkValue);
    imagePopup.querySelector('.popup__img').setAttribute('alt', nameValue);
    imagePopup.querySelector('.popup__img-caption').textContent = nameValue;
  });
  return cardElement;
}

// Слушаем (крестик) POPUPа с изображением и фон PopUpa
buttonCloseImagePopup.addEventListener('click', ()=> {closePopup(imagePopup);});


arrPopup.forEach((el) => {
  el.addEventListener('click', (evt)=> {
    if(evt.target.classList.contains('popup')) {
      closePopup(el);
    }
  })
});

document.addEventListener('keydown',(evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector(".popup_opened");
    openedPopup.classList.remove("popup_opened");
    }
});

// ----------------------------------------------------------------------------------------------------------
//Функция добавления карточки на страницу
function renderCard (name, link) {
  cardContainer.prepend(createCard(name, link));
}
// ----------------------------------------------------------------------------------------------------------
//Инициализация первых карточек
initialCards.forEach((elem) => renderCard(elem.name, elem.link));

// ----------------------------------------------------------------------------------------------------------
//Добавление новой карточки при нажатии
formAddCardPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard (nameCardPopup.value, linkImgCardPopup.value);
  nameCardPopup.value = '';
  linkImgCardPopup.value = '';
  closePopup(cardPopup);
});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}--error`);
  inputElement.classList.add('popup__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  // Показываем сообщение об ошибке
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}--error`);
  inputElement.classList.remove('popup__input_type_error');
  // Скрываем сообщение об ошибке
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__button');
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

enableValidation();

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  }
}; 
