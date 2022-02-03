import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Stat {
  ytelseId: string;
}

interface YtelseFilterProps {
  selected: string[];
  setSelected: (ytelser: string[]) => void;
  ytelseList: Stat[];
}

export const YtelseFilter = ({ selected, setSelected, ytelseList }: YtelseFilterProps) => {
  const ytelser = useFilterYtelser(ytelseList);
  return <Filter label="Ytelse" filters={ytelser} selected={selected} setSelected={setSelected} />;
};

const useFilterYtelser = (ytelseList: Stat[]): FilterType[] => {
  const ytelser = useKodeverkValueDefault('ytelser');

  return useMemo<FilterType[]>(
    () =>
      ytelseList
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
    [ytelseList, ytelser]
  );
};
