import React, { useContext, useState } from 'react';
import AuthContext from '../Auth/AuthContext';
import classes from './Profile.module.css';

const ProfileForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDddUDuA6N4zFOCqXbkYxSOpZJt-q1HHcQ`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: authCtx.token,
            newPassword: newPassword,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      console.log('Password changed');
    } catch (error) {
      console.error(error);
    }
  };

  const newPasswordChangeHandler = (event) => {
    setNewPassword(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          value={newPassword}
          onChange={newPasswordChangeHandler}
        />
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;




