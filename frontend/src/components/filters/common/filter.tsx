import { useMemo, useState } from 'react';
import { useUpdateFilters } from '../../filters/hooks/use-update-filters';
import type { FilterType } from '../types';
import { Checkboxes } from './checkboxes';
import { Dropdown } from './dropdown';
import { FilteredCheckboxes } from './filtered-checkboxes';

interface Props<T extends string | number> {
  label: string;
  filters: FilterType<T>[];
  selected: T[];
  setSelected: (filters: string[]) => void;
}

export const Filter = <T extends string | number>({ label, filters, selected, setSelected }: Props<T>) => {
  const [open, setOpen] = useState(false);

  const updateFilters = useUpdateFilters<T>(selected, setSelected);

  const allIds = useMemo(() => filters.map(({ id }) => id.toString()), [filters]);

  const selectAll = () => setSelected(allIds);
  const close = () => setOpen(false);
  const reset = () => setSelected([]);

  if (filters.length >= 5) {
    return (
      <Dropdown label={label} metadata={selected.length} open={open} setOpen={setOpen}>
        <FilteredCheckboxes<T>
          selected={selected}
          filters={filters}
          onCheck={updateFilters}
          close={close}
          reset={reset}
          selectAll={selectAll}
        />
      </Dropdown>
    );
  }

  return (
    <Dropdown label={label} metadata={selected.length} open={open} setOpen={setOpen}>
      <Checkboxes<T> selected={selected} filters={filters} onCheck={updateFilters} />
    </Dropdown>
  );
};
