

import React from 'react';
import { Link } from 'react-router-dom';
import VerifyEmailButton from './VerifyEmailButton';
const AboutUs = ({ user }) => {
  console.log(user)
  return (
    <div className="container">
      <h2 className="text-center mt-5">Welcome To Expense Tracker</h2>
      <div className="row justify-content-center">
        <p>Your profile is not complete.</p>
        <p>
          <Link to="/contact-detail">Click here to complete it</Link>
        </p>
      </div>
      <div><VerifyEmailButton user={user}/></div>
    </div>
  );
};

export default AboutUs;