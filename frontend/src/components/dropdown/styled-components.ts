import { styled } from 'styled-components';

const StyledOptionList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledSectionList = styled(StyledOptionList)`
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

export const StyledListItem = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 8px;
`;
