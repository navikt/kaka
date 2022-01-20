import React, { useCallback, useState } from 'react';
import { useUpdateFilters } from '../../hooks/use-update-filters';
import { FilterType } from '../../types';
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

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    },
    [setOpen]
  );

  if (filters.length >= 10) {
    return (
      <Dropdown label={label} metadata={selected.length} open={open} setOpen={setOpen}>
        <FilteredCheckboxes selected={selected} filters={filters} onCheck={updateFilters} onKeyDown={onKeyDown} />
      </Dropdown>
    );
  }

  return (
    <Dropdown label={label} metadata={selected.length} open={open} setOpen={setOpen}>
      <Checkboxes selected={selected} filters={filters} onCheck={updateFilters} />
    </Dropdown>
  );
};
