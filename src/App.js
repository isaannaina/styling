import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './component/LogInPage';
import AboutUs from './component/AbooutUs';
import ProfileUpdatePage from './component/ContactForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // Perform email verification using the user details

    console.log(userData);

    setUser(userData);
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    // Clear the idToken stored in local storage
    localStorage.removeItem('idToken');
    setIsLoggedIn(false);
  };
  return (
    <Router>
       {isLoggedIn && (
          <button onClick={handleLogout} style={{ position: 'absolute', right: 20, top: 20 }}>
            Logout
          </button>
        )}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/about-us" /> : <AuthForm onLogin={handleLogin} />}
        />
        <Route
          path="/about-us"
          element={
            isLoggedIn ? (
              <AboutUs user={user}  />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/contact-detail" element={<ProfileUpdatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
