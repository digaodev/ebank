import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as authClient from '../utils/auth';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(null);

  useEffect(() => {
    function checkUserLocalStorage() {
      const token = authClient.getToken();

      setIsSignedIn(!!token);
    }

    checkUserLocalStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSignedIn, login: authClient.login, logout: authClient.logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};
