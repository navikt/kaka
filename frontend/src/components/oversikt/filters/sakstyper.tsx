import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../hooks/use-statistics';
import { FilterType } from '../types';
import { Filter } from './common/filter';

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

export const SakstypeFilter = ({ selected, setSelected }: SakstypeFilterProps) => {
  const sakstyper = useFilterTypes();
  return <Filter label="Type" filters={sakstyper} selected={selected} setSelected={setSelected} />;
};

const useFilterTypes = (): FilterType[] => {
  const stats = useAllStatistics();
  const sakstyper = useKodeverkValueDefault('sakstyper');

  return useMemo<FilterType[]>(
    () =>
      stats.reduce<FilterType[]>((acc, { sakstypeId }) => {
        const sakstype = acc.find(({ id }) => id === sakstypeId);

        if (typeof sakstype === 'undefined') {
          const navn: string = sakstyper.find(({ id }) => id === sakstypeId)?.navn ?? 'Mangler navn';
          return [...acc, { id: sakstypeId, navn, count: 1 }];
        }

        return [...acc.filter(({ id }) => id !== sakstypeId), { ...sakstype, count: sakstype.count + 1 }];
      }, []),
    [stats, sakstyper]
  );
};
