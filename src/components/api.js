//Данные с адресом сервера на который обращаемся и токен для авторизации
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-16',
  headers: {
    authorization: '8e484665-06f6-4a1a-8841-c5612a4870b1',
    'Content-Type': 'application/json'
  }
};

//Функция получения данных профиля
export const getProfileData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

//Функция получения карточек с сервера, возвращает JSON с массивом карточек, которые загрузили студенты нашей группы.
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const patchDataProfile = (name, about) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
};

//Добавление новой карточки
export const addNewCard = (name, link) => {
  fetch(`${config.baseUrl}/cards `, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
};

//Удаление карточки
export const deleteCardServer = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
};

//Лайк карточки
export const likeCardServer = (cardId) => {
  fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
};

//Проверка постановки лайка
export const LikeCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }})
    .then((res) => {
      res.array.forEach(element => {
        element
      });
      });
    };
    
  //Удалить лайк карточки
  export const deleteLikeCardServer = (cardId) => {
    fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
  };
