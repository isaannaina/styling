import { useSelector,  } from 'react-redux';
import Counter from './components/Counter';
import Auth from './components/Auth';
import Header from './components/Header';
import UserProfile from './components/UserProfile';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div>
      <Header />
      {isLoggedIn ? (
        <>
          <UserProfile />
        </>
      ) : (
        <Auth />
      )}
      <Counter />
    </div>
  );
}

export default App;
