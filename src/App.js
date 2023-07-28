import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import AuthForm from './component/LogInPage'; 
import AboutUs from './component/AbooutUs'; 
import ProfileUpdatePage from './component/ContactForm';
import ExpenseTracker from './component/ExpenseTracker'; 

const App = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<AuthForm />}
          />
          <Route
            path="/about-us"
            element={<AboutUs />}
          />
          <Route path="/contact-detail" element={<ProfileUpdatePage  accessToken={accessToken}/>} />
          <Route path="/expense" element={<ExpenseTracker />} />
        </Routes>
      </Router>
  );
};

export default App;
