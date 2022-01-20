import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../hooks/use-statistics';
import { FilterType } from '../types';
import { Filter } from './common/filter';

interface YtelseFilterProps {
  selected: string[];
  setSelected: (ytelser: string[]) => void;
}

export const YtelseFilter = ({ selected, setSelected }: YtelseFilterProps) => {
  const ytelser = useFilterYtelser();
  return <Filter label="Ytelse" filters={ytelser} selected={selected} setSelected={setSelected} />;
};

const useFilterYtelser = (): FilterType[] => {
  const stats = useAllStatistics();
  const ytelser = useKodeverkValueDefault('ytelser');

  return useMemo<FilterType[]>(
    () =>
      stats
        .reduce<FilterType[]>((acc, { ytelseId }) => {
          if (ytelseId === null) {
            const ytelse = acc.find(({ id }) => id === 'none');

            if (typeof ytelse === 'undefined') {
              const newFilter: FilterType = { id: 'none', navn: 'Ingen', count: 1 };
              return [...acc, newFilter];
            }

            return [...acc.filter(({ id }) => id !== ytelseId), { ...ytelse, count: ytelse.count + 1 }];
          }

          const ytelse = acc.find(({ id }) => id === ytelseId);

          if (typeof ytelse === 'undefined') {
            const navn: string = ytelser.find(({ id }) => id === ytelseId)?.navn ?? 'Mangler navn';
            const newFilter: FilterType = { id: ytelseId, navn, count: 1 };
            return [...acc, newFilter];
          }

          return [...acc.filter(({ id }) => id !== ytelseId), { ...ytelse, count: ytelse.count + 1 }];
        }, [])
        .sort((a, b) => a.navn.localeCompare(b.navn)),
    [stats, ytelser]
  );
};
