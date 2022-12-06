import React from 'react';
import { useSakstyper } from '../../simple-api-state/use-kodeverk';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

export const SakstypeFilter = ({ selected, setSelected }: SakstypeFilterProps) => {
  const { data = [] } = useSakstyper();

  const sakstyper = data?.map<FilterType>(({ id, navn }) => ({ id, label: navn })) ?? [];

  return <Filter label="Type" filters={sakstyper} selected={selected} setSelected={setSelected} />;
};
