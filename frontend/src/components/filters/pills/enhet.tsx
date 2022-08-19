import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { QueryParams } from '../../filters/filter-query-params';
import { Pill } from './pills';

interface Props {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
  values: string[];
  category: string;
}

export const SelectedEnheterFilters = ({ setFilter, values, category }: Props) => {
  const enheter = useKodeverkValueDefault('enheter');

  const mappedValues = useMemo(() => enheter.filter(({ id }) => values.includes(id)), [enheter, values]);

  const pills = mappedValues.map(({ id, navn }) => (
    <Pill
      key={id}
      id={id}
      queryKey={QueryParams.ENHETER}
      setFilter={setFilter}
      name={navn}
      values={values}
      category={category}
    />
  ));

  return <>{pills}</>;
};

export const SelectedKlageenheterFilters = ({ setFilter, values, category }: Props) => {
  const klageenheter = useKodeverkValueDefault('klageenheter');

  const mappedValues = useMemo(() => klageenheter.filter(({ id }) => values.includes(id)), [klageenheter, values]);

  const pills = mappedValues.map(({ id, navn }) => (
    <Pill
      key={id}
      id={id}
      queryKey={QueryParams.KLAGEENHETER}
      setFilter={setFilter}
      name={navn}
      values={values}
      category={category}
    />
  ));

  return <>{pills}</>;
};
