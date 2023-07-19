import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="container">
      <h2 className="text-center mt-5">Welcome To Expense Tracker</h2>
      <div className="row justify-content-center">
        <p>Your profile is not complete.</p>
        <p>
          <Link to="/contact-detail">Click here to complete it</Link>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;