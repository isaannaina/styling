

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './component/SignUpForm';
import AuthForm from './component/LogInPage';
import MailPage from './component/EmailPage/MailPage';
const App = () => {
  
  return (
      <Router>
        <Routes>
          <Route
            path="/login-page"
            element={<SignUpForm/>}
          />
          <Route
            path="/"
            element={<AuthForm/>}
          />
         <Route
            path="/about-us"
            element={<MailPage/>}
          />
        </Routes>
      </Router>
  );
};

export default App;






