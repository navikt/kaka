import styled from 'styled-components';

export const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;

  .footer-button {
    width: 200px;
    margin-right: 1em;
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  z-index: 5;
`;

export const StyledFinishedFooter = styled(StyledFooter)`
  border-top: 1px solid #06893a;
  background-color: #cde7d8;
`;

export const StyledUnfinishedFooter = styled(StyledFooter)`
  border-top: 1px solid #368da8;
  background-color: #e0f5fb;
`;

export const StyledUnfinishedErrorFooter = styled(StyledFooter)`
  border-top: 1px solid #d47b00;
  background-color: #ffe9cc;
`;
