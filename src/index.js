import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './component/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // Wrap the entire application with the Provider and pass the Redux store as a prop
  <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
