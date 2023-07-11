
import React, { useContext } from 'react';
import AuthContext from '../Auth/AuthContext';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.token) {
    return null;
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};
export default UserProfile













