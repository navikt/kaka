import { Input } from 'nav-frontend-skjema';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Checkboxes, CheckboxesProps } from './checkboxes';

interface Props extends CheckboxesProps {
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export const FilteredCheckboxes = ({ selected, filters, onCheck, onKeyDown }: Props): JSX.Element => {
  const [filter, setFilter] = useState('');

  const filteredFilters = useMemo(
    () => filters.filter(({ navn }) => navn.toLowerCase().includes(filter.toLowerCase())),
    [filter, filters]
  );

  return (
    <>
      <StyledInput
        type="text"
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
        onKeyDown={onKeyDown}
        autoFocus
      />
      <Checkboxes selected={selected} filters={filteredFilters} onCheck={onCheck} />
    </>
  );
};

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 8px;
`;
