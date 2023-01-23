import React, { useMemo } from 'react';
import { AddOptionButton } from './add-option-button';
import { DEFAULT_OPTIONS } from './default-options';
import { SimpleComparisonItem } from './simple-comparison-item';
import { useOnchange } from './use-onchange';

interface Option {
  id: string;
  label: string;
}

interface Props {
  data: Option[];
}

export const ComparisonOption = ({ data }: Props) => {
  const { selectedValues, add, remove, setId, setColor } = useOnchange();
  const options = useMemo(() => [...data, ...DEFAULT_OPTIONS], [data]);
  const availableOptions = useMemo(
    () => options.filter((e) => !selectedValues.some(([id]) => id === e.id)),
    [options, selectedValues]
  );
  const availableOptionIds = availableOptions.map((e) => e.id);
  const itemOptions = useMemo(() => availableOptions.map((e) => ({ value: e.id, label: e.label })), [availableOptions]);

  const [nextOption] = availableOptionIds;

  return (
    <>
      <AddOptionButton option={nextOption} onAdd={add} />
      {selectedValues.map(([id, color]) => (
        <SimpleComparisonItem
          key={id}
          value={id}
          color={color}
          currentOption={{ value: id, label: options.find((e) => e.id === id)?.label ?? '' }}
          availableOptions={itemOptions}
          onRemove={remove}
          onChangeId={setId}
          onChangeColor={setColor}
        />
      ))}
    </>
  );
};
