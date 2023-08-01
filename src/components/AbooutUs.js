import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import VerifyEmailButton from './VerifyEmailButton';
import { logout } from './AuthSlice'; // Import the logout action

import './AboutUs.css';

const AboutUs = () => {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // New: Get isLoggedIn state
  const dispatch = useDispatch(); // New: Get dispatch function

  // Handle logout button click
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  return (
    <div className="container">
      {isLoggedIn && ( // Conditionally render the logout button
        <div className="Use position-absolute and top-0 end-0 ">
          <button onClick={handleLogout} className="btn btn-outline-danger">
            Logout
          </button>
        </div>
      )}
      <div className="row mt-5 align-items-center">
        <div className="col-md-6 text-center text-md-left">
          <h2 className="display-4">Welcome To Expense Tracker</h2>
          <p className="lead">Your profile is not complete.</p>
          <p>
            <Link to="/contact-detail" className="btn btn-success">
              Click here to complete it
            </Link>
          </p>
          <h2 className="text-center mt-5">Online Expense Tracker</h2>
          <p>
            <Link to="/expense" className="btn btn-success btn-lg btn-start-now">
              Start Now - it's free
            </Link>
          </p>
        </div>
        <div className="col-md-6 text-center text-md-right">
          <img
            src="https://images.freeimages.com/variants/mSVG5yUNUi5YbtB86KWFpy22/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"
            alt="Expense Tracker"
            className="img-fluid rounded-circle img-avatar"
            style={{ width: '600px', height: '500px' }}
          />
        </div>
      </div>

      {isLoggedIn && ( // Conditionally render the email verification button
        <div>
          <h3>Verify Your E-mail Please</h3>
          <div className="row justify-content-center mt-4">
            <VerifyEmailButton user={user} accessToken={accessToken} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
