import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import AuthForm from './AuthForm';
import AboutUs from './AboutUs';

describe('App', () => {
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('AuthForm', () => {
  test('should switch between Login and Sign Up form', () => {
    render(<AuthForm />);
    const switchButton = screen.getByText(/Create new account/i);

    userEvent.click(switchButton);
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();

    userEvent.click(switchButton);
    expect(screen.queryByLabelText(/Confirm Password/i)).not.toBeInTheDocument();
  });

  test('should show error messages for empty fields', () => {
    render(<AuthForm />);
    const submitButton = screen.getByText(/Log In/i);

    userEvent.click(submitButton);
    expect(screen.getByText(/Please fill in all the fields./i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);
    expect(screen.queryByText(/Please fill in all the fields./i)).not.toBeInTheDocument();
  });

  test('should show error message for non-matching passwords', () => {
    render(<AuthForm />);
    const switchButton = screen.getByText(/Create new account/i);
    userEvent.click(switchButton);

    const submitButton = screen.getByText(/Create Account/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.type(confirmPasswordInput, 'password1234');
    userEvent.click(submitButton);

    expect(screen.getByText(/Passwords do not match./i)).toBeInTheDocument();
  });

  test('should show loading state when submitting form', async () => {
    render(<AuthForm />);
    const submitButton = screen.getByText(/Log In/i);

    userEvent.click(submitButton);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });
  });

  test('should dispatch login action when submitting form', async () => {
    render(<AuthForm />, { wrapper: ({ children }) => <Provider store={store}>{children}</Provider> });
    const submitButton = screen.getByText(/Log In/i);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');

    userEvent.click(submitButton);

    await waitFor(() => {
      expect(store.getState().auth.isLoggedIn).toBe(true);
      expect(store.getState().auth.user.email).toBe('test@example.com');
    });
  });

  test('should show "Forgot Password?" link and handle forget password flow', async () => {
    render(<AuthForm />);
    const forgetPasswordButton = screen.getByText(/Forgot Password?/i);
    userEvent.click(forgetPasswordButton);

    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, 'test@example.com');

    const sendButton = screen.getByText(/Send/i);
    userEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/A password reset link has been sent to your email. Please check your inbox./i)).toBeInTheDocument();
    });
  });
});

describe('AboutUs', () => {
  test('should not display a logout button when not logged in', () => {
    render(<AboutUs />);
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  test('should display a logout button when logged in', () => {
    render(<Provider store={store}><AboutUs /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('should dispatch logout action when clicking the logout button', () => {
    render(<Provider store={store}><AboutUs /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    const logoutButton = screen.getByText(/Logout/i);
    userEvent.click(logoutButton);

    expect(store.getState().auth.isLoggedIn).toBe(false);
    expect(store.getState().auth.user).toBe(null);
    expect(store.getState().auth.accessToken).toBe(null);
  });

  test('should not show "Verify Your E-mail Please" section when not logged in', () => {
    render(<AboutUs />);
    expect(screen.queryByText(/Verify Your E-mail Please/i)).not.toBeInTheDocument();
  });

  test('should show "Verify Your E-mail Please" section when logged in', () => {
    render(<Provider store={store}><AboutUs /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    expect(screen.getByText(/Verify Your E-mail Please/i)).toBeInTheDocument();
  });
});
