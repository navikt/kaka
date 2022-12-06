import React, { useMemo } from 'react';
import { useUtfall } from '../../simple-api-state/use-kodeverk';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface UtfallFilterProps {
  selected: string[];
  setSelected: (utfall: string[]) => void;
}

export const UtfallFilter = ({ selected, setSelected }: UtfallFilterProps): JSX.Element => {
  const { data: utfall = [] } = useUtfall();
  const filters = useMemo<FilterType[]>(() => utfall.map(({ id, navn }) => ({ label: navn, id })), [utfall]);

  return <Filter label="Utfall" filters={filters} selected={selected} setSelected={setSelected} />;
};
