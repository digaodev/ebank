import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import api from '../services/api';

const sessionStorageKey = '__ebank_token__';

const AuthContext = React.createContext();

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

function useAuthProvider() {
  function getToken() {
    return window.sessionStorage.getItem(sessionStorageKey);
  }

  const [token, setToken] = useState(getToken());

  function handleUserResponse({ data }) {
    setToken(data.token);
    window.sessionStorage.setItem(sessionStorageKey, data.token);
    return data.token;
  }
  function login({ username, password }) {
    return api
      .post('/user/login', { username, password })
      .then(handleUserResponse)
      .catch(_ => toast.error('Email ou senha inválidos'));
  }

  function logout() {
    setToken(false);
    window.sessionStorage.removeItem(sessionStorageKey);
    return Promise.resolve();
  }

  useEffect(() => {
    const tokenFromSession = getToken();

    if (tokenFromSession) {
      setToken(tokenFromSession);
    } else {
      setToken(null);
    }
  }, [token]);

  // Return the user object and auth methods
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
