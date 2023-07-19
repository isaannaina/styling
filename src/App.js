
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './component/LogInPage';
import AboutUs from './component/AbooutUs';
import ProfileUpdatePage from './component/ContactForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/about-us" /> : <AuthForm onLogin={loginHandler} />}
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-detail" element={<ProfileUpdatePage/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;






