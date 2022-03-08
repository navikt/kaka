import React, { useMemo } from 'react';
import { IYtelse } from '../../types/kodeverk';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface YtelseFilterProps {
  selected: string[];
  setSelected: (ytelser: string[]) => void;
  ytelser: IYtelse[];
}

export const YtelseFilter = ({ ytelser, selected, setSelected }: YtelseFilterProps) => {
  const filters = useMemo<FilterType[]>(() => ytelser.map(({ id, navn }) => ({ label: navn, id })), [ytelser]);

  return <Filter label="Ytelse" filters={filters} selected={selected} setSelected={setSelected} />;
};
