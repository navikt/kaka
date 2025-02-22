import { StaticDataLoader } from '@app/components/app/static-data-context';
import { reduxStore } from '@app/redux/configure-store';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { KakaHeader } from '../header/header';
import { Router } from '../routing/routes';
import { GlobalStyles } from './global-styles';
import { ScrollReset } from './scroll-reset';
import './chartjs-default-config';

export const App = () => (
  <StrictMode>
    <Provider store={reduxStore}>
      <StaticDataLoader>
        <BrowserRouter>
          <GlobalStyles />
          <ScrollReset />
          <KakaHeader />
          <Router />
        </BrowserRouter>
      </StaticDataLoader>
    </Provider>
  </StrictMode>
);
