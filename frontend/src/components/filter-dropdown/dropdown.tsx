import Knapp from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Filter } from './option';

export interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  selected: string[];
  options: Option[];
  onChange: (id: string | null, active: boolean) => void;
  open: boolean;
  fixedWidth?: boolean;
}

export const Dropdown = ({ selected, options, open, onChange, fixedWidth }: DropdownProps): JSX.Element | null => {
  const [filter, setFilter] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(
    () => setFilteredOptions(options.filter(({ label }) => label.toLowerCase().includes(filter.toLowerCase()))),
    [setFilteredOptions, options, filter]
  );

  if (!open) {
    return null;
  }

  const reset = () => {
    onChange(null, false);
  };

  const onFilterChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(target.value);
  };

  return (
    <StyledList width={fixedWidth === true ? '275px' : 'auto'}>
      <StyledTopListItem>
        <StyledInput onChange={onFilterChange} value={filter} placeholder="Søk på hjemmel" />
        <Knapp mini kompakt onClick={reset}>
          Fjern alle
        </Knapp>
      </StyledTopListItem>
      {filteredOptions.map(({ value, label }) => (
        <StyledListItem key={value}>
          <Filter
            active={selected.includes(value)}
            filterId={value}
            onChange={onChange}
            whiteSpace={fixedWidth === true ? 'normal' : 'nowrap'}
          >
            {label}
          </Filter>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

const StyledList = styled.ul<{ width: string }>`
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0;
  margin: 0;
  min-width: 100%;
  list-style: none;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #c6c2bf;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
  max-height: calc(100vh - 20em);
  overflow-y: auto;
  overflow-x: hidden;
  text-overflow: ellipsis;
  z-index: 1;
  width: ${({ width }) => width};
`;

const StyledListItem = styled.li`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const StyledTopListItem = styled(StyledListItem)`
  border-bottom: 1px solid #c6c2bf;
  background-color: white;
  padding: 8px;
  display: flex;
`;

const StyledInput = styled(Input)`
  margin-right: 0.5em;
`;
