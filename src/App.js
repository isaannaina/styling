import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { Provider } from 'react-redux';
import { useSelector } from 'react-redux'; // Import useSelector hook to access Redux store
import AuthForm from './component/LogInPage'; // Corrected the import path
import AboutUs from './component/AbooutUs'; // Corrected the import path
import ProfileUpdatePage from './component/ContactForm'; // Corrected the import path
import ExpenseTracker from './component/ExpenseTracker'; // Corrected the import path

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
