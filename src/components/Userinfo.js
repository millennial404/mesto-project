export default class UserInfo {
  constructor({slectorNameUser, selectorAboutUser, selectorAvatarUser}) {
    this._slectorNameUser = document.querySelector(slectorNameUser);
    this._selectorAboutUser = document.querySelector(selectorAboutUser);
    this._selectorAvatarUser = document.querySelector(selectorAvatarUser);
    this.idUser = "";
  }

  getUserInfo() {
    return {
      name: this._slectorNameUser.textContent,
      profession: this._selectorAboutUser.textContent
    }
  }

  setUserInfo({name, about, avatar, _id}) {
    this._slectorNameUser.textContent = name;
    this._selectorAboutUser.textContent = about;
    this._selectorAvatarUser.src = avatar;
    this.idUser = _id;
  }
}
