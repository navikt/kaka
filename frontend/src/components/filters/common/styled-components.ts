import { styled } from 'styled-components';

export const FilterPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 8px;
`;

export const StyledHr = styled.hr`
  color: var(--ax-border-neutral-subtle);
  width: 100%;
  height: 1px;
`;
