export default class UserInfo {
  constructor({ slectorNameUser, selectorAboutUser, selectorAvatarUser }) {
    this._slectorNameUser = document.querySelector(slectorNameUser);
    this._selectorAboutUser = document.querySelector(selectorAboutUser);
    this._selectorAvatarUser = document.querySelector(selectorAvatarUser);
  }

  getUserInfo(Callback) {
    return Callback().then((userData) => {
      return {
        ...userData
      };
    }).then((userData) => this.setUserInfo(userData))
  }

  setUserInfo(userData) {
    this._slectorNameUser.textContent = userData.name;
    this._selectorAboutUser.textContent = userData.about;
    this._selectorAvatarUser.src = userData.avatar;
  }
}
