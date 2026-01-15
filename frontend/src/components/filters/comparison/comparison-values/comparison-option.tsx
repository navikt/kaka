import type { IKodeverkSimpleValue } from '@app/types/kodeverk';
import { useMemo } from 'react';
import { AddOptionButton } from './add-option-button';
import { AVERAGE, AVERAGE_LABEL, GLOBAL_AVERAGE, GLOBAL_AVERAGE_LABEL, REST, REST_LABEL } from './default-options';
import { SimpleComparisonItem } from './simple-comparison-item';
import { useOnchange } from './use-onchange';

interface Props {
  data: IKodeverkSimpleValue[];
  testId?: string;
}

export const ComparisonOption = ({ data, testId }: Props) => {
  const { selectedValues, add, remove, setId, setColor } = useOnchange();
  const options = useMemo(
    () => [
      { value: AVERAGE, label: AVERAGE_LABEL },
      { value: GLOBAL_AVERAGE, label: GLOBAL_AVERAGE_LABEL },
      ...data.map(({ id, navn }) => ({ value: id, label: navn })),
      { value: REST, label: REST_LABEL },
    ],
    [data],
  );
  const availableOptions = useMemo(
    () => options.filter((e) => !selectedValues.some(([id]) => id === e.value)),
    [options, selectedValues],
  );
  const availableOptionIds = availableOptions.map((e) => e.value);
  const [nextOption] = availableOptionIds;

  return (
    <>
      <AddOptionButton option={nextOption} onAdd={add} />
      {selectedValues.map(([id, color], i) => (
        <SimpleComparisonItem
          testId={`${testId}-${i}`}
          key={id}
          value={id}
          color={color}
          currentOption={{ value: id, label: options.find((e) => e.value === id)?.label ?? id }}
          availableOptions={availableOptions}
          onRemove={remove}
          onChangeId={setId}
          onChangeColor={setColor}
          selectedLabel={options.find((e) => e.value === id)?.label ?? id}
        />
      ))}
    </>
  );
};
