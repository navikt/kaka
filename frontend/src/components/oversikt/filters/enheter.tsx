import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../hooks/use-statistics';
import { FilterType } from '../types';
import { Filter } from './common/filter';

interface EnheterFilterProps {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const EnheterFilter = ({ selected, setSelected }: EnheterFilterProps) => {
  const enheter = useFilterEnheter();
  return <Filter label="Vedtaksinstans" selected={selected} filters={enheter} setSelected={setSelected} />;
};

const useFilterEnheter = (): FilterType[] => {
  const stats = useAllStatistics();
  const enheter = useKodeverkValueDefault('enheter');

  return useMemo<FilterType[]>(
    () =>
      stats
        .reduce<FilterType[]>((acc, { vedtaksinstansEnhet }) => {
          if (vedtaksinstansEnhet === null) {
            return acc;
          }

          const enhet = acc.find(({ id }) => id === vedtaksinstansEnhet);

          if (typeof enhet === 'undefined') {
            const navn: string = enheter.find(({ id }) => id === vedtaksinstansEnhet)?.beskrivelse ?? 'Mangler navn';
            return [...acc, { id: vedtaksinstansEnhet, navn, count: 1 }];
          }

          return [...acc.filter(({ id }) => id !== vedtaksinstansEnhet), { ...enhet, count: enhet.count + 1 }];
        }, [])
        .sort((a, b) => a.navn.localeCompare(b.navn)),
    [stats, enheter]
  );
};
