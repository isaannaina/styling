import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './AuthSlice';
import { useNavigate} from 'react-router-dom'; // Import useHistory

const AuthForm = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const Navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password || (!isLogin && !confirmPassword)) {
      alert('Please fill in all the fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:${
          isLogin ? 'signInWithPassword' : 'signUp'
        }?key=AIzaSyC8-Y5HlurWaS7Da45sHWmqcnHWlR465PI`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Authentication failed!');
      }
    
      const data = await response.json();

      const user = {
        email: email,
        idToken: data.idToken,
        accessToken: data.idToken,
      };
console.log(user)
      dispatch(login({ user, accessToken:data.idToken }));
      localStorage.setItem('idToken', data.idToken);
    Navigate('/about-us');

      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      alert('Authentication failed. Please try again.');
    }

    setIsLoading(false);
  };

  const handleForgetPassword = async () => {
    try {
      if (!email) {
        alert('Please enter your email to reset the password.');
        return;
      }

      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC8-Y5HlurWaS7Da45sHWmqcnHWlR465PI`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      alert('A password reset link has been sent to your email. Please check your inbox.');
    } catch (err) {
      console.error(err);
      alert('Password reset failed. Please try again.');
    }
  };

  


  return (
    <section className="auth">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center"></h1>
      <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirm-password" >Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              className="form-control"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
        )}
        <div className="actions">
          {!isLoading ? (
            <>
              <button type="submit" className="btn btn-primary btn-block">{isLogin ? 'Log In' : 'Create Account'}</button>
              <button type="button" className="btn btn-link"  onClick={handleForgetPassword}>
                Forgot Password?
              </button>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <p onClick={switchAuthModeHandler}   className="auth-switch text-center pointer btn btn-success mt-2  "
>
          {isLogin ? 'Create new account' : 'Log in with existing account'}
        </p>
      </form>
      </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
