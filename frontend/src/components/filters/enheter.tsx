import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface EnheterFilterProps {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const EnheterFilter = ({ selected, setSelected }: EnheterFilterProps) => {
  const klageenheter = useKodeverkValueDefault('enheter');
  const filters = useMemo<FilterType[]>(
    () => klageenheter.map(({ navn, beskrivelse }) => ({ label: `${navn} - ${beskrivelse}`, id: navn })),
    [klageenheter]
  );

  return <Filter label="Vedtaksinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
