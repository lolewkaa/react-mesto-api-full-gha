export const BASE_URL = 'http://api.mesto.backend.nomoredomains.xyz';

function chekResult(res) {
    if (res.ok) {
      return res.json();
    }
    
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`); 
  }

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    }).then((res) => chekResult(res))
}

export const authorization = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, email})
      }).then((res) => chekResult(res))
  }

  export const getContent = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
    
  }
}).then((res) => chekResult(res))
  }