import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface EnheterFilterProps {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const KlageenheterFilter = ({ selected, setSelected }: EnheterFilterProps) => {
  const enheter = useKodeverkValueDefault('enheter');
  const filters = useMemo<FilterType[]>(
    () => enheter.map(({ id, navn, beskrivelse }) => ({ label: `${navn} - ${beskrivelse}`, id })),
    [enheter]
  );

  return <Filter label="Klageinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
