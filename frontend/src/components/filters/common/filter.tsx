import React, { useState } from 'react';
import { useUpdateFilters } from '../../filters/hooks/use-update-filters';
import { FilterType } from '../types';
import { Checkboxes } from './checkboxes';
import { Dropdown } from './dropdown';
import { FilteredCheckboxes } from './filtered-checkboxes';

interface Props {
  label: string;
  filters: FilterType[];
  selected: string[];
  setSelected: (filters: string[]) => void;
}

export const Filter = ({ label, filters, selected, setSelected }: Props) => {
  const [open, setOpen] = useState(false);

  const updateFilters = useUpdateFilters(selected, setSelected);

  const close = () => setOpen(false);
  const reset = () => setSelected([]);

  if (filters.length >= 10) {
    return (
      <Dropdown label={label} metadata={selected.length} open={open} setOpen={setOpen}>
        <FilteredCheckboxes selected={selected} filters={filters} onCheck={updateFilters} close={close} reset={reset} />
      </Dropdown>
    );
  }

  return (
    <Dropdown label={label} metadata={selected.length} open={open} setOpen={setOpen}>
      <Checkboxes selected={selected} filters={filters} onCheck={updateFilters} />
    </Dropdown>
  );
};
