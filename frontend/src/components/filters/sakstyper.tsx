import React from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

export const SakstypeFilter = ({ selected, setSelected }: SakstypeFilterProps) => {
  const data = useKodeverkValueDefault('sakstyper');

  const sakstyper = data?.map<FilterType>(({ id, navn }) => ({ id, label: navn })) ?? [];

  return <Filter label="Type" filters={sakstyper} selected={selected} setSelected={setSelected} />;
};
