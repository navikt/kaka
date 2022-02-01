import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { IKodeverkValue } from '../../../types/kodeverk';
import { FilterType, StatisticsProps } from '../types';
import { Filter } from './common/filter';

interface EnheterFilterProps extends StatisticsProps {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const KlageenheterFilter = ({ selected, setSelected, stats }: EnheterFilterProps) => {
  const enheter = useFilterEnheter(stats);
  return <Filter label="Klageinstans" selected={selected} filters={enheter} setSelected={setSelected} />;
};

const useFilterEnheter = (stats: StatisticsProps['stats']): FilterType[] => {
  const klageenheter = useKodeverkValueDefault('klageenheter');

  return useMemo<FilterType[]>(
    () =>
      stats
        .reduce<FilterType[]>((acc, { tilknyttetEnhet }) => {
          const enhet = acc.find(({ id }) => id === tilknyttetEnhet);

          if (typeof enhet === 'undefined') {
            const newEnhet = klageenheter.find(({ navn }) => navn === tilknyttetEnhet);
            const label: string = getEnhetLabel(newEnhet);
            return [...acc, { id: tilknyttetEnhet, label, count: 1 }];
          }

          return [...acc.filter(({ id }) => id !== tilknyttetEnhet), { ...enhet, count: (enhet.count ?? 0) + 1 }];
        }, [])
        .sort((a, b) => a.label.localeCompare(b.label)),
    [stats, klageenheter]
  );
};

const getEnhetLabel = (enhet?: IKodeverkValue): string => {
  if (typeof enhet === 'undefined') {
    return 'Mangler navn';
  }

  const { navn, beskrivelse } = enhet;

  return `${navn} - ${beskrivelse}`;
};
