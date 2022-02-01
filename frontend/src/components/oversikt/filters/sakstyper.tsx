import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { FilterType, StatisticsProps } from '../types';
import { Filter } from './common/filter';

interface SakstypeFilterProps extends StatisticsProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

export const SakstypeFilter = ({ selected, setSelected, stats }: SakstypeFilterProps) => {
  const sakstyper = useFilterTypes(stats);
  return <Filter label="Type" filters={sakstyper} selected={selected} setSelected={setSelected} />;
};

const useFilterTypes = (stats: StatisticsProps['stats']): FilterType[] => {
  const sakstyper = useKodeverkValueDefault('sakstyper');

  return useMemo<FilterType[]>(
    () =>
      stats.reduce<FilterType[]>((acc, { sakstypeId }) => {
        const sakstype = acc.find(({ id }) => id === sakstypeId);

        if (typeof sakstype === 'undefined') {
          const label: string = sakstyper.find(({ id }) => id === sakstypeId)?.navn ?? 'Mangler navn';
          return [...acc, { id: sakstypeId, label, count: 1 }];
        }

        return [...acc.filter(({ id }) => id !== sakstypeId), { ...sakstype, count: (sakstype.count ?? 0) + 1 }];
      }, []),
    [stats, sakstyper]
  );
};
