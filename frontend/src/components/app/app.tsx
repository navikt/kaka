import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { reduxStore } from '../../redux/configure-store';
import { GlobalStyles } from './global-styles';
import { Routes } from './routes';

export const App = () => (
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <GlobalStyles />

        <Header />

        <Routes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
