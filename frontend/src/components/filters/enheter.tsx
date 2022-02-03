import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { IKodeverkValue } from '../../types/kodeverk';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Stat {
  vedtaksinstansEnhet: string | null;
}

interface EnheterFilterProps {
  selected: string[];
  setSelected: (enheter: string[]) => void;
  vedtaksinstansEnhetList: Stat[];
}

export const EnheterFilter = ({ selected, setSelected, vedtaksinstansEnhetList }: EnheterFilterProps) => {
  const enheter = useFilterEnheter(vedtaksinstansEnhetList);
  return <Filter label="Vedtaksinstans" selected={selected} filters={enheter} setSelected={setSelected} />;
};

const useFilterEnheter = (stats: Stat[]): FilterType[] => {
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
            const newEnhet = enheter.find(({ navn }) => navn === vedtaksinstansEnhet);
            const label: string = getEnhetLabel(newEnhet);
            return [...acc, { id: vedtaksinstansEnhet, label, count: 1 }];
          }

          return [...acc.filter(({ id }) => id !== vedtaksinstansEnhet), { ...enhet, count: (enhet.count ?? 0) + 1 }];
        }, [])
        .sort((a, b) => a.label.localeCompare(b.label)),
    [stats, enheter]
  );
};

const getEnhetLabel = (enhet?: IKodeverkValue): string => {
  if (typeof enhet === 'undefined') {
    return 'Mangler navn';
  }

  const { navn, beskrivelse } = enhet;

  return `${navn} - ${beskrivelse}`;
};
