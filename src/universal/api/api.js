import fetch from 'isomorphic-fetch';

const API_BASE = 'https://hndrxx.polymail.io';
const API_AUTH = '/v1/auth';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'charset': 'utf-8'
};

export const POSTLogin = ({email, password}, cb, err) => {
  let url = API_BASE + API_AUTH + '/login';

  let options = {
    method: 'POST',
    header: DEFAULT_HEADERS,
    body: JSON.stringify({
      email: email,
      password: password
    })
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
};


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
