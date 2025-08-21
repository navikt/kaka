import { styled } from 'styled-components';

export const FilterPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;
`;

export const Container = styled.div`
  position: relative;
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  column-gap: 8px;
`;

interface StyledLabelProps {
  open: boolean;
}

export const StyledDropdownButton = styled.button<StyledLabelProps>`
  border: 1px solid var(--ax-border-accent);
  border-radius: 4px;
  min-height: 32px;
  line-height: 24px;
  padding: 4px;
  padding-left: 8px;
  padding-right: 32px;
  margin: 0;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  position: relative;
  width: 100%;
  background-color: var(--ax-bg-default);
`;

export const StyledHr = styled.hr`
  color: var(--ax-border-neutral-subtle);
  width: 100%;
  height: 1px;
`;
