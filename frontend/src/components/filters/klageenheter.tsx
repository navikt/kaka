import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Props {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const KlageenheterFilter = ({ selected, setSelected }: Props) => {
  const klageenheter = useKodeverkValueDefault('klageenheter');

  const filters = useMemo<FilterType[]>(
    () => klageenheter.map(({ id, navn }) => ({ label: `${id} - ${navn}`, id })),
    [klageenheter]
  );

  return <Filter label="Klageinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
