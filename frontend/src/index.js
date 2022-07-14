import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { Provider } from 'react-redux';


import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <Provider store={store}>
    <App />
    </Provider>
);

