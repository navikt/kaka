import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { IKodeverk } from '../../../types/kodeverk';
import { QueryParams } from '../types';
import { PillIcon, StyledLi, StyledPill } from './styled-components';

export { PillContainer } from './styled-components';

interface SelectedFiltersProps<Q extends QueryParams, K extends keyof IKodeverk> extends CommonProps<Q> {
  kodeverkKey: K;
}

export const SelectedFilters = <Q extends QueryParams, K extends keyof IKodeverk>({
  values,
  queryKey,
  kodeverkKey,
  setFilter,
}: SelectedFiltersProps<Q, K>) => {
  const kodeverkValues = useKodeverkValueDefault(kodeverkKey);

  const mappedValues = useMemo(
    () =>
      kodeverkValues
        .filter(({ id }) => values.includes(id))
        .map((v) => {
          if (typeof v['beskrivelse'] === 'string') {
            return { id: v.id, name: v['beskrivelse'] };
          } else if (typeof v['navn'] === 'string') {
            return { id: v.id, name: v['navn'] };
          }

          return { id: v.id, name: v.id };
        }),
    [kodeverkValues, values]
  );

  const pills = mappedValues.map(({ id, name }) => (
    <Pill key={id} id={id} queryKey={queryKey} setFilter={setFilter} name={name} values={values} />
  ));
  return <>{pills}</>;
};

interface CommonProps<Q extends QueryParams> {
  queryKey: Q;
  setFilter: (filter: QueryParams, ...values: string[]) => void;
  values: string[];
}

interface PillProps<Q extends QueryParams> extends CommonProps<Q> {
  id: string;
  name: string;
}

export const Pill = <Q extends QueryParams>({ name, queryKey, setFilter, id, values }: PillProps<Q>) => (
  <StyledLi>
    <StyledPill title={`Fjern ${name}`} onClick={() => setFilter(queryKey, ...values.filter((v) => v !== id))}>
      {name} <PillIcon />
    </StyledPill>
  </StyledLi>
);
