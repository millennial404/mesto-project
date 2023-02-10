export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  getProfileData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse)
  }

  setProfileData(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse)
  }


}









  //Данные с адресом сервера на который обращаемся и токен для авторизации
  const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
    headers: {
      authorization: '8e484665-06f6-4a1a-8841-c5612a4870b1',
      'Content-Type': 'application/json'
    }
  };

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

//Функция получения данных профиля
export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse)
};

//Функция получения карточек с сервера, возвращает JSON с массивом карточек, которые загрузили студенты нашей группы.
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse)
};

export const patchDataProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse)
};

//Добавление новой карточки
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards `, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse)
};

//Удаление карточки
export const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
};

//Лайк карточки
export const likeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(checkResponse)
};

//Удалить лайк карточки
export const deleteLikeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(checkResponse)
};

//Обновление аватара
export const updateAvaProfile = (linkAva) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkAva
    })
  })
    .then(checkResponse)
};
