import React, { useMemo } from 'react';
import { QueryParams } from '../../filters/filter-query-params';
import { KOMMENTARER_KODEVERK } from '../../filters/kommentarer';
import { Pill } from './pills';

interface Props {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
  values: string[];
}

export const SelectedKommentarer = ({ setFilter, values }: Props) => {
  const mappedValues = useMemo(() => KOMMENTARER_KODEVERK.filter(({ id }) => values.includes(id)), [values]);

  const pills = mappedValues.map(({ id, label }) => (
    <Pill
      key={id}
      id={id}
      name={label}
      queryKey={QueryParams.KOMMENTARER}
      category="Kommentarer"
      values={values}
      setFilter={setFilter}
    />
  ));

  return <>{pills}</>;
};
