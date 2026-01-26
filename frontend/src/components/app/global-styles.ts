import { createGlobalStyle, css } from 'styled-components';
import '@navikt/ds-css';

const styles = css`
  html {
    box-sizing: border-box;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    overflow-y: auto;
    scroll-padding-top: 100px;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body,
  #app {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const GlobalStyles = createGlobalStyle`${styles}`;
