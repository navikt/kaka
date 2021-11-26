import { createGlobalStyle, css } from 'styled-components';

const styles = css`
  html {
    box-sizing: border-box;
    font-family: 'Source Sans Pro', Arial, sans-serif;
    overflow-y: auto;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body,
  #app {
    display: block;
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const GlobalStyles = createGlobalStyle`${styles}`;
