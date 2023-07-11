import React, { useContext, useRef, useState, useEffect } from 'react';
import AuthContext from './AuthContext';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          isLogin ? 'signInWithPassword' : 'signUp'
        }?key=AIzaSyDddUDuA6N4zFOCqXbkYxSOpZJt-q1HHcQ`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Authentication failed!');
      }

      const data = await response.json();
      const expirationTime = new Date(
        new Date().getTime() + parseInt(data.expiresIn) * 1000
      );
      authCtx.login(data.idToken, expirationTime);

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('expirationTime', expirationTime.toISOString());

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }

    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('expirationTime');
    if (storedToken && expirationTime) {
      const remainingTime = new Date(expirationTime) - new Date();
      if (remainingTime > 0) {
    
        authCtx.login(storedToken, expirationTime);
      } else {

        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        authCtx.logout();
      }
    }
  }, [authCtx]);

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    
    authCtx.logout();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading ? (
            <button type='submit'>{isLogin ? 'Login' : 'Sign Up'}</button>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </form>
      {!isLoading && (
        <button
          type='button'
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      )}
      {authCtx.token && (
        <button type='button' className={classes.logout} onClick={logoutHandler}>
          Logout
        </button>
      )}
    </section>
  );
};

export default AuthForm;









