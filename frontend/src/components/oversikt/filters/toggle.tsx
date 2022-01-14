import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  children: React.ReactNode;
}

export const ToggleFilter = ({ label, children }: Props) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <StyledLabel onClick={() => setShow(!show)} show={show}>
        {label}
      </StyledLabel>
      {show ? children : null}
    </>
  );
};

interface StyledLabelProps {
  show: boolean;
}

const StyledLabel = styled.button<StyledLabelProps>`
  border: none;
  background-color: transparent;
  text-align: left;
  padding: 0;
  margin: 0;
  margin-bottom: 16px;
  cursor: pointer;
  font-weight: 700;
  position: relative;

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
    transform: ${({ show }) =>
      show ? 'translateX(-3px) translateY(-50%) rotate(45deg)' : 'translateX(-3px) translateY(-50%) rotate(-45deg)'};
  }

  ::after {
    transform: ${({ show }) =>
      show ? 'translateX(1.5px) translateY(-50%) rotate(-45deg)' : 'translateX(1.5px) translateY(-50%) rotate(45deg)'};
  }
`;
