import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../hooks/use-statistics';
import { FilterType } from '../types';
import { Filter } from './common/filter';

interface UtfallFilterProps {
  selected: string[];
  setSelected: (utfall: string[]) => void;
}

export const UtfallFilter = ({ selected, setSelected }: UtfallFilterProps): JSX.Element => {
  const utfall = useFilterUtfall();
  return <Filter label="Utfall" filters={utfall} selected={selected} setSelected={setSelected} />;
};

const useFilterUtfall = (): FilterType[] => {
  const stats = useAllStatistics();
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
            const navn: string = utfallList.find(({ id }) => id === utfallId)?.navn ?? 'Mangler navn';
            return [...acc, { id: utfallId, navn, count: 1 }];
          }

          return [...acc.filter(({ id }) => id !== utfallId), { ...existingUtfall, count: existingUtfall.count + 1 }];
        }, [])
        .sort((a, b) => a.navn.localeCompare(b.navn)),
    [stats, utfallList]
  );
};
