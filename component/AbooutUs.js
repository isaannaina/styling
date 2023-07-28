import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook to access Redux store
import VerifyEmailButton from './VerifyEmailButton';
import './AboutUs.css';

const AboutUs = () => {
  // Use useSelector hook to access the user and accessToken from the Redux store
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  console.log(accessToken);
  return (
    <div className="container">
      <div className="row mt-5 align-items-center">
        {/* First section */}
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
          <img src="https://images.freeimages.com/variants/mSVG5yUNUi5YbtB86KWFpy22/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d"   alt="Expense Tracker"
            className="img-fluid rounded-circle img-avatar"
            style={{ width: '600px', height: '500px' }} />
           
        </div>
      </div>
      {/* Second section - email verification */}
      { 
        <div>

          <h3>Verify Your E-mail Please</h3>
          <div className="row justify-content-center mt-4">
            {/* Pass the accessToken along with the user prop */}
            <VerifyEmailButton user={user} accessToken={accessToken} />
          </div>
        </div>
      }
    </div>
  );
  
};

export default AboutUs;
