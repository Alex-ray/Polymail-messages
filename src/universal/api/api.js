import fetch from 'isomorphic-fetch';

const API_BASE = 'https://hndrxx.polymail.io';
const API_AUTH = '/v1/auth';
const API_THREADS = '/v1/threads';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'charset': 'utf-8'
};

export const getAuthHeaders = (authToken) => {
  return {
    ...DEFAULT_HEADERS,
    'Authorization': `METRO ${authToken}`
  };
}


export const GETThreads = (authToken) => {
  const headers = getAuthHeaders(authToken);
  const url = API_BASE + API_THREADS;

  const options = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export const POSTLogin = ({email, password}) => {
  const url = API_BASE + API_AUTH + '/login';

  const options = {
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
