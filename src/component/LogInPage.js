// AuthForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './AuthSlice';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Please fill in all the fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8-Y5HlurWaS7Da45sHWmqcnHWlR465PI`,
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
console.log(response)
      if (!response.ok) {
        throw new Error('Authentication failed!');
      }

      const data = await response.json();

      const user = {
        email: email,
        idToken: data.idToken,
        accessToken: data.idToken,
      };

      dispatch(login({ user, accessToken: data.idToken }));
      localStorage.setItem('idToken', data.idToken);
      setIsLoading(false);
      navigate('/about-us');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert('Authentication failed. Please try again.');
    }
  };

 

  return (
    <section className="auth">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card">
              <div className="card-body">
                
                <h1>Log In</h1>
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
                  <div className="actions">
                    {!isLoading ? (
                      <>
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Log In
                        </button>
                        <button
                          type="button"
                          className="btn btn-link"
                          
                        >
                          Forgot Password?
                        </button>
                      </>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                  <p
                    className="auth-switch text-center pointer btn btn-success mt-2"
                  >
                    Create new account
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
