import React from 'react';
import styled from 'styled-components';
import { StyledCheckbox } from '../../styled-components/checkbox';

interface FilterProps {
  onChange: (id: string | null, active: boolean) => void;
  active: boolean;
  filterId?: string | null;
  children: string;
  whiteSpace?: string;
}

export const Filter = ({ active, filterId = null, children, onChange, whiteSpace }: FilterProps): JSX.Element => (
  <StyledLabel whiteSpace={whiteSpace}>
    <StyledCheckbox type="checkbox" checked={active} onChange={(event) => onChange(filterId, event.target.checked)} />
    <StyledText>{children}</StyledText>
  </StyledLabel>
);

const StyledLabel = styled.label<{ whiteSpace?: string }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  padding: 0.5em 1em;
  font-size: 1em;
  font-weight: 400;
  user-select: none;
  white-space: ${({ whiteSpace }) => whiteSpace ?? 'nowrap'};
  word-break: keep-all;
  overflow: hidden;

  &:hover {
    color: #0067c5;
  }
`;

const StyledText = styled.span`
  width: 100%;
  margin-left: 8px;
`;
