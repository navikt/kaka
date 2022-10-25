import styled from 'styled-components';

export const FilterPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  position: relative;
  width: 100%;
  z-index: 1;
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
  border: 1px solid rgb(120, 112, 106);
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

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 8px;
    border-radius: 2px;
    height: 2px;
    background: #59514b;
    right: 8px;
    top: 50%;
    transition: transform 0.1s ease;
  }

  ::before {
    transform: ${({ open }) =>
      open ? 'translateX(-3px) translateY(-50%) rotate(-45deg)' : 'translateX(-3px) translateY(-50%) rotate(45deg)'};
  }

  ::after {
    transform: ${({ open }) =>
      open ? 'translateX(1.5px) translateY(-50%) rotate(45deg)' : 'translateX(1.5px) translateY(-50%) rotate(-45deg)'};
  }
`;
