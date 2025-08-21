import { styled } from 'styled-components';

export const StyledComparisonItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Ellipsis = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DropdownContainer = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
`;
