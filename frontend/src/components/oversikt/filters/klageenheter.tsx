import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useAllStatistics } from '../hooks/use-statistics';
import { FilterType } from '../types';
import { Filter } from './common/filter';

interface EnheterFilterProps {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const KlageenheterFilter = ({ selected, setSelected }: EnheterFilterProps) => {
  const enheter = useFilterEnheter();
  return <Filter label="Klageinstans" selected={selected} filters={enheter} setSelected={setSelected} />;
};

const useFilterEnheter = (): FilterType[] => {
  const stats = useAllStatistics();
  const klageenheter = useKodeverkValueDefault('klageenheter');

  return useMemo<FilterType[]>(
    () =>
      stats
        .reduce<FilterType[]>((acc, { tilknyttetEnhet }) => {
          const enhet = acc.find(({ id }) => id === tilknyttetEnhet);

          if (typeof enhet === 'undefined') {
            const navn: string = klageenheter.find(({ id }) => id === tilknyttetEnhet)?.beskrivelse ?? 'Mangler navn';
            return [...acc, { id: tilknyttetEnhet, navn, count: 1 }];
          }

          return [...acc.filter(({ id }) => id !== tilknyttetEnhet), { ...enhet, count: enhet.count + 1 }];
        }, [])
        .sort((a, b) => a.navn.localeCompare(b.navn)),
    [stats, klageenheter]
  );
};
