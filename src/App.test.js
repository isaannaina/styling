import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import store from './store';
import App from './App';
import AuthForm from './AuthForm';
import AboutUs from './AboutUs';

// Mock API response data for authentication
const mockAuthResponse = (email, idToken) => ({
  kind: 'identitytoolkit#VerifyPasswordResponse',
  localId: 'test_user_id',
  email,
  idToken,
  refreshToken: 'test_refresh_token',
  expiresIn: '3600',
});

// Mock API response data for expenses
const mockExpensesResponse = [
  { id: '1', title: 'Expense 1', amount: 100 },
  { id: '2', title: 'Expense 2', amount: 200 },
  { id: '3', title: 'Expense 3', amount: 300 },
];

// Mock API response data for password reset
const mockPasswordResetResponse = { email: 'test@example.com', kind: 'identitytoolkit#GetOobConfirmationCodeResponse' };

describe('App', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('AuthForm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

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

    fetchMock.mockResponseOnce(JSON.stringify(mockAuthResponse('test@example.com', 'test_token')));

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

    fetchMock.mockResponseOnce(JSON.stringify(mockPasswordResetResponse));

    const sendButton = screen.getByText(/Send/i);
    userEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/A password reset link has been sent to your email. Please check your inbox./i)).toBeInTheDocument();
    });
  });

  test('should display a success message for password reset', async () => {
    render(<AuthForm />);
    const forgetPasswordButton = screen.getByText(/Forgot Password?/i);
    userEvent.click(forgetPasswordButton);

    const emailInput = screen.getByLabelText(/Email/i);
    userEvent.type(emailInput, 'test@example.com');

    fetchMock.mockResponseOnce(JSON.stringify(mockPasswordResetResponse));

    const sendButton = screen.getByText(/Send/i);
    userEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/A password reset link has been sent to your email. Please check your inbox./i)).toBeInTheDocument();
    });
  });
});

describe('AboutUs', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

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

describe('Expense Tracker', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should display expenses correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExpensesResponse));

    render(<Provider store={store}><App /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    const expensesList = await screen.findAllByTestId('expense-item');
    expect(expensesList).toHaveLength(3);
    expect(expensesList[0]).toHaveTextContent('Expense 1');
    expect(expensesList[1]).toHaveTextContent('Expense 2');
    expect(expensesList[2]).toHaveTextContent('Expense 3');
  });

  test('should add a new expense', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExpensesResponse));

    render(<Provider store={store}><App /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    const addButton = screen.getByText(/Add Expense/i);
    userEvent.click(addButton);

    const titleInput = screen.getByLabelText(/Title/i);
    const amountInput = screen.getByLabelText(/Amount/i);
    const saveButton = screen.getByText(/Save/i);

    userEvent.type(titleInput, 'New Expense');
    userEvent.type(amountInput, '123');

    fetchMock.mockResponseOnce(JSON.stringify({ id: '4', title: 'New Expense', amount: 123 }));
    
    userEvent.click(saveButton);

    await waitFor(() => {
      const newExpenseItem = screen.getByText(/New Expense/i);
      expect(newExpenseItem).toBeInTheDocument();
    });
  });

  test('should delete an expense', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExpensesResponse));

    render(<Provider store={store}><App /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    const expensesList = await screen.findAllByTestId('expense-item');
    expect(expensesList).toHaveLength(3);

    const deleteButton = expensesList[0].querySelector('button');
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Expense 1/i)).not.toBeInTheDocument();
    });
  });

  test('should display an error message for failed expense deletion', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockExpensesResponse));

    render(<Provider store={store}><App /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    const expensesList = await screen.findAllByTestId('expense-item');
    expect(expensesList).toHaveLength(3);

    const deleteButton = expensesList[0].querySelector('button');
    fetchMock.mockReject(new Error('Failed to delete expense'));
    
    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to delete expense/i)).toBeInTheDocument();
    });
  });
});

describe('Theme', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should change the theme', () => {
    render(<Provider store={store}><App /></Provider>);
    store.dispatch({ type: 'auth/login', payload: { user: { email: 'test@example.com' }, accessToken: 'test_token' } });

    const themeToggleButton = screen.getByTestId('theme-toggle-button');

    expect(screen.getByTestId('light-theme')).toBeInTheDocument();

    userEvent.click(themeToggleButton);

    expect(screen.getByTestId('dark-theme')).toBeInTheDocument();

    userEvent.click(themeToggleButton);

    expect(screen.getByTestId('light-theme')).toBeInTheDocument();
  });
});
