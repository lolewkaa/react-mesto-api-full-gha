class Api {
constructor(setting){
  this._address = setting.baseUrl
  this._headers = setting.headers  

}

_chekResult(res) {
  if (res.ok) {
    return res.json();
  }
  
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`); 
}
//возвращает данные о пользователе
getUserInfo(){
    //создаем запрос на сервер и возвращаем его ответ
    return fetch(`${this._address}/users/me`, {
        method: 'GET',
        headers: this._headers,
    }).then(res => this._chekResult(res))
}


getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers,
    })
      .then(res => this._chekResult(res))
  }


  changeUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
      .then(res => this._chekResult(res))
}

postNewCard(data) {
    return fetch(`${this._address}/cards`, {
        method: 'POST',
        headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          }),
    }).then(res => this._chekResult(res))
}

deleteCard(cardId){
  return fetch(`${this._address}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers,
}).then(res => this._chekResult(res))
}

changeLike(cardId, isLiked) {
  if (isLiked) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers,
        }).then(res => this._chekResult(res))
      }
        else {
          return fetch(`${this._address}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers,
              }).then(res => this._chekResult(res))
        }
  }


// likeCard(cardId){
//   return fetch(`${this._address}/cards/${cardId}/likes`, {
//     method: 'PUT',
//     headers: this._headers,
//   }).then(res => this._chekResult(res))
// }

// deleteLikeCard(cardId){
//   return fetch(`${this._address}/cards/${cardId}/likes`, {
//     method: 'DELETE',
//     headers: this._headers,
//   }).then(res => this._chekResult(res))
// }

changeAvatar(data) {
 return fetch(`${this._address}/users/me/avatar`, {
  method: 'PATCH', 
  headers: this._headers,
  body: JSON.stringify({
    avatar: data.avatar
  }),
 }).then(res => this._chekResult(res))
}



}

const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "51cc9dc9-38a6-4ea6-94cb-92255188bdc1",
    "Content-Type": "application/json",
  },
};

export const api = new Api(apiConfig)


