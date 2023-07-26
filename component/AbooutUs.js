import React from 'react';
import { Link } from 'react-router-dom';
import VerifyEmailButton from './VerifyEmailButton';
import './AboutUs.css'; // Import the custom CSS file

const AboutUs = ({ user }) => {
  console.log(user);
  return (
    <div className="container">
      <div className="row mt-5 align-items-center">
        <div className="col-md-6 text-center text-md-left">
          <h2 className="display-4">Welcome To Expense Tracker</h2>
          <p className="lead">Your profile is not complete.</p>
          <p>
            <Link to="/contact-detail" className="btn btn-success">Click here to complete it</Link>
          </p>
          <h2 className="text-center mt-5">Online Expense Tracker</h2>

          <p>
            <Link to="/expense" className="btn btn-success btn-lg btn-start-now">Start Now - it's free</Link>
          </p>
        </div>
        <div className="col-md-6 text-center text-md-right">
          <img src="https://images.freeimages.com/variants/mSVG5yUNUi5YbtB86KWFpy22/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d" alt="Expense Tracker" className="img-fluid rounded-circle img-avatar" />
        </div>
      </div>
      <h3>Veryify Your E-mail Please</h3>
      <div className="row justify-content-center mt-4">
        <VerifyEmailButton user={user} />
      </div>
    </div>
  );
};

export default AboutUs;
