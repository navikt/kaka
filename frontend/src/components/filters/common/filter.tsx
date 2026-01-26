import type { FilterType } from '@app/components/filters/types';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button, Checkbox, CheckboxGroup, HStack, TextField } from '@navikt/ds-react';
import { useMemo, useState } from 'react';

interface Props<T extends string | number> {
  label: string;
  filters: FilterType<T>[];
  selected: T[];
  setSelected: (filters: string[]) => void;
}

export const Filter = <T extends string | number>({ selected, setSelected, filters, label }: Props<T>) => {
  const [value, setValue] = useState('');

  const selectedOptions = useMemo(
    () => (selected || []).map((id) => filters.find((option) => option.id === id)).filter((v) => v !== undefined),
    [filters, selected],
  );

  const filteredOptions = useMemo(
    () => filters.filter((option) => option.label.toLowerCase().includes(value.toLowerCase())),
    [filters, value],
  );

  const all = useMemo(() => filters.map((option) => option.id.toString()), [filters]);

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          size="small"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
          className="justify-between!"
        >
          {label} ({selectedOptions.length})
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content className="relative">
        <HStack wrap={false} className="sticky top-0 z-1 bg-ax-bg-default">
          <TextField
            size="small"
            autoFocus
            className="grow"
            placeholder="Filtrer"
            label={label}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            hideLabel
          />

          <Button onClick={() => setSelected(all)} size="small" variant="secondary" style={{ marginLeft: 8 }}>
            Velg alle
          </Button>

          <Button
            data-color="danger"
            onClick={() => setSelected([])}
            size="small"
            variant="primary"
            style={{ marginLeft: 8 }}
          >
            Fjern alle
          </Button>
        </HStack>

        <ActionMenu.Divider />

        <CheckboxGroup legend={label} hideLegend value={selected} onChange={setSelected}>
          {filteredOptions.map(({ id, label }) => (
            // <Checkbox> renders much faster than <ActionMenu.CheckboxItem>
            <Checkbox key={id} size="small" value={id}>
              {label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
