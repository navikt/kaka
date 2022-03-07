import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

export const SakstypeFilter = ({ selected, setSelected }: SakstypeFilterProps) => {
  const sakstyper = useKodeverkValueDefault('sakstyper');
  const filters = useMemo<FilterType[]>(() => sakstyper.map(({ id, navn }) => ({ label: navn, id })), [sakstyper]);

  return <Filter label="Type" filters={filters} selected={selected} setSelected={setSelected} />;
};
