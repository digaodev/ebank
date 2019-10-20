import api from 'axios';

const sessionStorageKey = '__ebank_token__';

function handleUserResponse({ token }) {
  window.sessionStorage.setItem(sessionStorageKey, token);
  return token;
}
function login({ username, password }) {
  return api
    .post('/user/login', { body: { username, password } })
    .then(handleUserResponse);
}

function logout() {
  window.sessionStorage.removeItem(sessionStorageKey);
  return Promise.resolve();
}
function getToken() {
  return window.sessionStorage.getItem(sessionStorageKey);
}

export { login, logout, getToken };
