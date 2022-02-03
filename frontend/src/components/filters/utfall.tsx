import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { UtfallEnum } from '../../types/utfall';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Stat {
  utfallId: UtfallEnum;
}

interface UtfallFilterProps {
  selected: string[];
  setSelected: (utfall: string[]) => void;
  utfallList: Stat[];
}

export const UtfallFilter = ({ selected, setSelected, utfallList }: UtfallFilterProps): JSX.Element => {
  const utfall = useFilterUtfall(utfallList);
  return <Filter label="Utfall" filters={utfall} selected={selected} setSelected={setSelected} />;
};

const useFilterUtfall = (utfallList: Stat[]): FilterType[] => {
  const utfall = useKodeverkValueDefault('utfall');

  return useMemo<FilterType[]>(
    () =>
      utfallList
        .reduce<FilterType[]>((acc, { utfallId }) => {
          if (utfallId === null) {
            return acc;
          }

          const existingUtfall = acc.find(({ id }) => id === utfallId);

          if (typeof existingUtfall === 'undefined') {
            const label: string = utfall.find(({ id }) => id === utfallId)?.navn ?? 'Mangler navn';
            return [...acc, { id: utfallId, label, count: 1 }];
          }

          return [
            ...acc.filter(({ id }) => id !== utfallId),
            { ...existingUtfall, count: (existingUtfall.count ?? 0) + 1 },
          ];
        }, [])
        .sort((a, b) => a.label.localeCompare(b.label)),
    [utfallList, utfall]
  );
};
