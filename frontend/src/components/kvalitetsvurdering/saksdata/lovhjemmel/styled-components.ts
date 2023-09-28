import { styled } from 'styled-components';

export const StyledSelectedHjemler = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 1em;
  border-left: 2px solid #ccc;
`;

export const StyledNoneSelected = styled.p`
  color: #a0a0a0;
  margin: 0;
`;

export const StyledSelectedList = styled.ul`
  list-style: none;
  padding-left: 10px;
  margin: 0;
`;

export const StyledListItem = styled.li`
  margin-bottom: 0.5em;

  :last-child {
    margin-bottom: 0;
  }
`;

export const StyledSelectedSectionHeader = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5em;
`;

export const StyledSelectedSection = styled.div`
  padding-top: 1em;

  :first-of-type {
    padding-top: 0;
  }
`;
