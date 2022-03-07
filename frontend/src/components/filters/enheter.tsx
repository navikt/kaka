import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface EnheterFilterProps {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const EnheterFilter = ({ selected, setSelected }: EnheterFilterProps) => {
  const klageenheter = useKodeverkValueDefault('klageenheter');
  const filters = useMemo<FilterType[]>(
    () => klageenheter.map(({ id, navn, beskrivelse }) => ({ label: `${navn} - ${beskrivelse}`, id })),
    [klageenheter]
  );

  return <Filter label="Vedtaksinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
