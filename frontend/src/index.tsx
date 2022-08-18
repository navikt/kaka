import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/app';
import '@navikt/ds-css';

ReactDOM.render(<App />, document.getElementById('app'));

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
