import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface OptionProps {
  onSelect: (id: string) => void;
  active: boolean;
  filterId: string;
  children: string;
  focused: boolean;
}

export const SingleSelectOption = ({ active, filterId, children, onSelect, focused }: OptionProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [focused]);

  return (
    <StyledButton onClick={() => onSelect(filterId)} theme={{ focused, active }} ref={ref}>
      <StyledChecked>{active ? '✓' : ''}</StyledChecked>
      {children}
    </StyledButton>
  );
};

SingleSelectOption.displayName = 'SingleSelectOption';

const StyledButton = styled.button`
  width: 100%;
  margin-left: 8px;
  border: none;
  text-align: left;
  margin: 0;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  padding-right: 1em;
  background: ${({ theme }: { theme: { focused: boolean } }) => (theme.focused ? '#0074df' : 'transparent')};
  color: ${({ theme }: { theme: { focused: boolean } }) => (theme.focused ? 'white' : 'black')};
  white-space: nowrap;

  :hover {
    background: #0074df;
    color: white;
  }
`;

const StyledChecked = styled.span`
  width: 2em;
  text-align: center;
  display: inline-block;
`;
