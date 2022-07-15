import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { store } from './app/store';
import { fetchWorkout } from './feature/workoutSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchWorkout());

root.render(
  <Provider store={store}>
        <App />
  </Provider>

);

