import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { AuthContextProvider } from './components/Auth/AuthContext';

function App() {
  return (
          <BrowserRouter>
              <AuthContextProvider>

    
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Layout>
      </AuthContextProvider>

    </BrowserRouter>

  );
}

export default App;



