import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export interface StyledLabelProps {
  open: boolean;
}

export const StyledLabel = styled.button<StyledLabelProps>`
  border: 1px solid rgb(120, 112, 106);
  border-radius: 4px;
  min-height: 40px;
  padding: 0;
  padding-left: 16px;
  padding-right: 16px;
  margin: 0;
  background-color: transparent;
  text-align: left;
  cursor: pointer;
  font-weight: 700;
  position: relative;
  width: 100%;

  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 0.5rem;
    border-radius: 2px;
    height: 2px;
    background: #59514b;
    right: 0.5rem;
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
