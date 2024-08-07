import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';

const container = document.getElementById('app');

if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
