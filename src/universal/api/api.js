import fetch from 'isomorphic-fetch';

const API_BASE = 'https://hndrxx.polymail.io';
const API_AUTH = '/v1/auth';
const API_THREADS = '/v1/threads';
const API_REPLY   = '/reply'

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

export const getAuthHeaders = (authToken) => {
  return {
    ...DEFAULT_HEADERS,
    'Authorization': `METRO ${authToken}`
  };
}


export const GETThreads = (authToken) => {
  const headers = getAuthHeaders(authToken);
  const url = API_BASE+API_THREADS;

  const options = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

export const POSTLogin = ({email, password}) => {
  const url = API_BASE+API_AUTH+'/login';

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

export const POSTReply = ({messageId, replyText, authToken}) => {
  const url = API_BASE+API_THREADS+'/'+messageId+API_REPLY;
  const headers = getAuthHeaders(authToken);

  console.log(headers);

  const options = {
    method: 'POST',
    header: headers,
    body: JSON.stringify({
      "body": "<p>replyText</p>"
    })
  };

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}


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
