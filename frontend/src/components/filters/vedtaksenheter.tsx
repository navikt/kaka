import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Props {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const VedtaksenheterFilter = ({ selected, setSelected }: Props) => {
  const klageenheter = useKodeverkValueDefault('vedtaksenheter');
  const filters = useMemo<FilterType[]>(
    () => klageenheter.map(({ id, navn }) => ({ label: `${id} - ${navn}`, id })),
    [klageenheter]
  );

  return <Filter label="Vedtaksinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
