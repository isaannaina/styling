import React, { useContext, useRef, useState } from 'react';
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
      authCtx.login(data.idToken);

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
    </section>
  );
};

export default AuthForm;

