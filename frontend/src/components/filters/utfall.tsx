import { useUtfallForStats } from '@app/simple-api-state/use-utfall';
import { useMemo } from 'react';
import { Filter } from './common/filter';
import type { FilterType } from './types';

interface UtfallFilterProps {
  selected: string[];
  setSelected: (utfall: string[]) => void;
}

export const UtfallFilter = ({ selected, setSelected }: UtfallFilterProps) => {
  const { data: utfall = [] } = useUtfallForStats();
  const filters = useMemo<FilterType[]>(() => utfall.map(({ id, navn }) => ({ label: navn, id })), [utfall]);

  return <Filter label="Utfall" filters={filters} selected={selected} setSelected={setSelected} />;
};
