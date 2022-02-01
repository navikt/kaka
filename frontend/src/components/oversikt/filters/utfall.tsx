import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { FilterType, StatisticsProps } from '../types';
import { Filter } from './common/filter';

interface UtfallFilterProps extends StatisticsProps {
  selected: string[];
  setSelected: (utfall: string[]) => void;
}

export const UtfallFilter = ({ selected, setSelected, stats }: UtfallFilterProps): JSX.Element => {
  const utfall = useFilterUtfall(stats);
  return <Filter label="Utfall" filters={utfall} selected={selected} setSelected={setSelected} />;
};

const useFilterUtfall = (stats: StatisticsProps['stats']): FilterType[] => {
  const utfallList = useKodeverkValueDefault('utfall');

  return useMemo<FilterType[]>(
    () =>
      stats
        .reduce<FilterType[]>((acc, { utfallId }) => {
          if (utfallId === null) {
            return acc;
          }

          const existingUtfall = acc.find(({ id }) => id === utfallId);

          if (typeof existingUtfall === 'undefined') {
            const label: string = utfallList.find(({ id }) => id === utfallId)?.navn ?? 'Mangler navn';
            return [...acc, { id: utfallId, label, count: 1 }];
          }

          return [
            ...acc.filter(({ id }) => id !== utfallId),
            { ...existingUtfall, count: (existingUtfall.count ?? 0) + 1 },
          ];
        }, [])
        .sort((a, b) => a.label.localeCompare(b.label)),
    [stats, utfallList]
  );
};
