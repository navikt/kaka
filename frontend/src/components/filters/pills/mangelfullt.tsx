import React, { useMemo } from 'react';
import { QueryParams } from '../../filters/filter-query-params';
import { MANGELFULLT_KODEVERK } from '../../filters/mangelfullt';
import { Pill } from './pills';

interface Props {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
  values: string[];
}

export const SelectedMangelfullt = ({ setFilter, values }: Props) => {
  const mappedValues = useMemo(() => MANGELFULLT_KODEVERK.filter(({ id }) => values.includes(id)), [values]);

  const pills = mappedValues.map(({ id, label }) => (
    <Pill
      key={id}
      id={id}
      name={label}
      queryKey={QueryParams.MANGELFULLT}
      category="Mangelfullt"
      values={values}
      setFilter={setFilter}
    />
  ));

  return <>{pills}</>;
};
