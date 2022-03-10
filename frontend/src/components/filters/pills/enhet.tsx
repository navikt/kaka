import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { IKodeverk } from '../../../types/kodeverk';
import { QueryParams } from '../../filters/filter-query-params';
import { Pill } from './pills';

type KlageenheterKey = keyof Pick<IKodeverk, 'klageenheter'>;
type EnheterKey = keyof Pick<IKodeverk, 'enheter'>;

interface Props {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
  type: KlageenheterKey | EnheterKey;
  values: string[];
  category: string;
}

export const SelectedEnheterFilters = ({ setFilter, type, values, category }: Props) => {
  const kodeverk = useKodeverkValueDefault(type);

  const mappedValues = useMemo(() => kodeverk.filter(({ id }) => values.includes(id)), [kodeverk, values]);

  const pills = mappedValues.map(({ id, beskrivelse }) => (
    <Pill
      key={id}
      id={id}
      queryKey={type === 'enheter' ? QueryParams.ENHETER : QueryParams.KLAGEENHETER}
      setFilter={setFilter}
      name={beskrivelse}
      values={values}
      category={category}
    />
  ));
  return <>{pills}</>;
};
