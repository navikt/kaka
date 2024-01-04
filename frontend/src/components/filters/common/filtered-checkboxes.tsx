import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Header } from '../../dropdown/header';
import { Checkboxes, CheckboxesProps } from './checkboxes';

interface Props<T extends string | number> extends CheckboxesProps<T> {
  close: () => void;
  reset: () => void;
}

export const FilteredCheckboxes = <T extends string | number>({
  selected,
  filters,
  onCheck,
  close,
  reset,
}: Props<T>): JSX.Element => {
  const [filteredFilters, setFilteredFilters] = useState(filters);

  return (
    <>
      <Header options={filters} onChange={setFilteredFilters} onReset={reset} close={close} />
      <Container>
        <Checkboxes selected={selected} filters={filteredFilters} onCheck={onCheck} />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding: 8px;
  overflow-y: scroll;
`;
