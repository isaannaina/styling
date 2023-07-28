import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './component/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


reportWebVitals();
