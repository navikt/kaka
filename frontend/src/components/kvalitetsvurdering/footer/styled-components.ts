import styled from 'styled-components';

export const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, max-content));
  column-gap: 16px;
  width: 100%;
`;

const StyledFooter = styled.div`
  display: flex;
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;
  padding-top: 8px;
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
