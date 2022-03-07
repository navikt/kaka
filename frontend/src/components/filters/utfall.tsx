import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface UtfallFilterProps {
  selected: string[];
  setSelected: (utfall: string[]) => void;
}

export const UtfallFilter = ({ selected, setSelected }: UtfallFilterProps): JSX.Element => {
  const utfall = useKodeverkValueDefault('utfall');
  const filters = useMemo<FilterType[]>(() => utfall.map(({ id, navn }) => ({ label: navn, id })), [utfall]);

  return <Filter label="Utfall" filters={filters} selected={selected} setSelected={setSelected} />;
};
