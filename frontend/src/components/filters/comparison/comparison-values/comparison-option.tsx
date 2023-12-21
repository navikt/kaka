import React, { useMemo } from 'react';
import { IKodeverkSimpleValue } from '@app/types/kodeverk';
import { AddOptionButton } from './add-option-button';
import { AVERAGE, AVERAGE_LABEL, GLOBAL_AVERAGE, GLOBAL_AVERAGE_LABEL, REST, REST_LABEL } from './default-options';
import { SimpleComparisonItem } from './simple-comparison-item';
import { useOnchange } from './use-onchange';

interface Props {
  data: IKodeverkSimpleValue[];
  testId: string;
}

export const ComparisonOption = ({ data, testId }: Props) => {
  const { selectedValues, add, remove, setId, setColor } = useOnchange();
  const options = useMemo(
    () => [
      { id: AVERAGE, navn: AVERAGE_LABEL },
      { id: GLOBAL_AVERAGE, navn: GLOBAL_AVERAGE_LABEL },
      ...data,
      { id: REST, navn: REST_LABEL },
    ],
    [data],
  );
  const availableOptions = useMemo(
    () => options.filter((e) => !selectedValues.some(([id]) => id === e.id)),
    [options, selectedValues],
  );
  const availableOptionIds = availableOptions.map((e) => e.id);
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
          currentOption={{ id, navn: options.find((e) => e.id === id)?.navn ?? id }}
          availableOptions={availableOptions}
          onRemove={remove}
          onChangeId={setId}
          onChangeColor={setColor}
          selectedLabel={options.find((e) => e.id === id)?.navn ?? id}
        />
      ))}
    </>
  );
};
