import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app/app';
import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import '@navikt/ds-datepicker/lib/index.css';

ReactDOM.render(<App />, document.getElementById('app'));

if (typeof module.hot !== 'undefined') {
  module.hot.accept();
}
