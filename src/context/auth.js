import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api, { sessionStorageKey } from '../services/api';

const AuthContext = React.createContext();

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

function useAuthProvider() {
  const [token, setToken] = useState(
    window.sessionStorage.getItem(sessionStorageKey)
  );

  function handleUserResponse({ data }) {
    setToken(data.token);
    window.sessionStorage.setItem(sessionStorageKey, data.token);
    // api.defaults.headers.common.Authorization = `Bearer ${token}`;

    return data.token;
  }
  function login({ username, password }) {
    return api
      .post('/user/login', { username, password })
      .then(handleUserResponse)
      .catch(_ => toast.error('Email ou senha inválidos'));
  }

  function logout() {
    setToken(null);
    window.sessionStorage.removeItem(sessionStorageKey);
    api.defaults.headers.common.Authorization = '';
    return Promise.resolve();
  }

  return {
    token,
    login,
    logout,
  };
}

function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
export { AuthProvider, useAuth };

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
