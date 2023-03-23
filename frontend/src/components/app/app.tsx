import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { reduxStore } from '@app/redux/configure-store';
import { KakaHeader } from '../header/header';
import { Router } from '../routing/routes';
import { GlobalStyles } from './global-styles';
import { ScrollReset } from './scroll-reset';
import './chartjs-default-config';

export const App = () => (
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <GlobalStyles />
        <ScrollReset />
        <KakaHeader />
        <Router />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
