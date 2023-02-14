import './index.css'; // импорт главного файла стилей
import Card from "../components/Card.js";
import Section from '../components/Section';
import Api from "../components/Api.js";
import UserInfo from '../components/Userinfo';
import PopupWithImage from '../components/PopupWithiImage';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import {
  apiOptions,
  buttonAddCardPopup,
  buttonAvaUpdate,
  buttonEditProfile,
  settingsValidate
} from "../utils/constants";

const api = new Api(apiOptions);
Promise.all([api.getProfileData(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    sectionCards.renderItems(cards, userData);
  })
  .catch((err) => {
    console.log(err)
  });

const createCard = (item, idProfile) => {
  const card = new Card(item, idProfile, '#card', {
    likeCard: (cardID) => api.likeCard(cardID),
    deletelikeCard: (cardID) => api.deletelikeCard(cardID),
    deleteCard: (cardID) => api.deleteCard(cardID),
    handleCardClick: (linkValue, nameValue) => imagePopup.open(linkValue, nameValue)
  });
  return card.generate()
}

const sectionCards = new Section({
  renderer: (item) => {
    sectionCards.addItem(createCard(item, userInfo.idUser));
  }
}, '.cards');

const userInfo = new UserInfo({
  slectorNameUser: '.profile__name', selectorAboutUser: '.profile__profession', selectorAvatarUser: '.profile__avatar'
});

const editProfile = new PopupWithForm('.popup_edit-profile', (data) => {
  api.setProfileData(data.name, data.profession)
    .then((res) => userInfo.setUserInfo(res))
    .then(() => editProfile.close())
    .catch((err) => {
      console.log(err)
    })
    .finally(() => editProfile.renderLoading(false))

});

const addCardPopup = new PopupWithForm('.popup_add-card', (data) => {
  api.addCard(data.name_card, data.link_img)
    .then((item) => {
      sectionCards.addItemfirst(createCard(item, userInfo.idUser));
    })
    .then(() => addCardPopup.close())
    .catch((err) => {
      console.log(err)
    })
    .finally(() => addCardPopup.renderLoading(false))
})

const imagePopup = new PopupWithImage('.popup_image');

const avaUpdatePopup = new PopupWithForm('.popup_updateAva', (data) => {
  api.updateAvatar(data.link_img)
    .then((res) => {
      userInfo.setUserInfo(res)
    })
    .then(() => avaUpdatePopup.close())
    .catch((err) => {
      console.log(err)
    })
    .finally(() => avaUpdatePopup.renderLoading(false))

});

const editProfileOpen = () => {
  editProfile.setInputValues(userInfo.getUserInfo())
  editProfile.open()
}

buttonEditProfile.addEventListener('click', editProfileOpen)

buttonAddCardPopup.addEventListener('click', () => {
  addCardPopup.open()
  formValidators["popup__form-addCard"].resetValidation();
})
buttonAvaUpdate.addEventListener('click', () => {
  avaUpdatePopup.open()
  formValidators["popup__updateAva"].resetValidation();
})


const formValidators = {}
const enableValidation = (settingsValidate) => {
  const formList = Array.from(document.querySelectorAll(settingsValidate.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(settingsValidate, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(settingsValidate);



