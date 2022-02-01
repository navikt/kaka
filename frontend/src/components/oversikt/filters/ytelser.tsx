import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { FilterType, StatisticsProps } from '../types';
import { Filter } from './common/filter';

interface YtelseFilterProps extends StatisticsProps {
  selected: string[];
  setSelected: (ytelser: string[]) => void;
}

export const YtelseFilter = ({ selected, setSelected, stats }: YtelseFilterProps) => {
  const ytelser = useFilterYtelser(stats);
  return <Filter label="Ytelse" filters={ytelser} selected={selected} setSelected={setSelected} />;
};

const useFilterYtelser = (stats: StatisticsProps['stats']): FilterType[] => {
  const ytelser = useKodeverkValueDefault('ytelser');

  return useMemo<FilterType[]>(
    () =>
      stats
        .reduce<FilterType[]>((acc, { ytelseId }) => {
          if (ytelseId === null) {
            const ytelse = acc.find(({ id }) => id === 'none');

            if (typeof ytelse === 'undefined') {
              const newFilter: FilterType = { id: 'none', label: 'Ingen', count: 1 };
              return [...acc, newFilter];
            }

            return [...acc.filter(({ id }) => id !== ytelseId), { ...ytelse, count: (ytelse.count ?? 0) + 1 }];
          }

          const ytelse = acc.find(({ id }) => id === ytelseId);

          if (typeof ytelse === 'undefined') {
            const label: string = ytelser.find(({ id }) => id === ytelseId)?.navn ?? 'Mangler navn';
            const newFilter: FilterType = { id: ytelseId, label, count: 1 };
            return [...acc, newFilter];
          }

          return [...acc.filter(({ id }) => id !== ytelseId), { ...ytelse, count: (ytelse.count ?? 0) + 1 }];
        }, [])
        .sort((a, b) => a.label.localeCompare(b.label)),
    [stats, ytelser]
  );
};
