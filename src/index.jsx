import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './js/App';
import store from './js/store';

import './styles/bootstrap.min.css';
import './styles/index.scss';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
