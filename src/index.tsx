import { CssBaseline } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { history } from 'utils';
import AppRouter from './App';
import { store } from './app/store';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <CssBaseline />
        <AppRouter />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
