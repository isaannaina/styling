


import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  token: null,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  let logoutTimer;

  const loginHandler = (token) => {
    setToken(token);
    const expirationTime = new Date(new Date().getTime() + 5 * 60 * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime.toISOString());
    logoutTimer = setTimeout(logoutHandler, 5 * 60 * 1000);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    if (storedToken && expirationTime) {
      const remainingTime = new Date(expirationTime) - new Date();
      if (remainingTime > 0) {
        setToken(storedToken);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
      } else {
        logoutHandler();
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, []);

  const contextValue = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
