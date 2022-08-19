import styled from 'styled-components';

export interface StyledDropdownProps {
  maxHeight?: string | number;
  minWidth?: string | number;
}

export const StyledDropdown = styled.div<StyledDropdownProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #c6c2bf;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
  z-index: 1;
  width: 100%;
  max-height: ${({ maxHeight = '256px' }) => maxHeight};
  min-width: ${({ minWidth = '275px' }) => minWidth};
`;

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
