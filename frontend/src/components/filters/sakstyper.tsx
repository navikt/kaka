import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { SakstypeEnum } from '../../types/sakstype';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Stat {
  sakstypeId: SakstypeEnum;
}

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
  sakstypeList: Stat[];
}

export const SakstypeFilter = ({ selected, setSelected, sakstypeList }: SakstypeFilterProps) => {
  const sakstyper = useFilterTypes(sakstypeList);
  return <Filter label="Type" filters={sakstyper} selected={selected} setSelected={setSelected} />;
};

const useFilterTypes = (stats: Stat[]): FilterType[] => {
  const sakstyper = useKodeverkValueDefault('sakstyper');

  return useMemo<FilterType[]>(
    () =>
      stats.reduce<FilterType[]>((acc, { sakstypeId }) => {
        const sakstype = acc.find(({ id }) => id === sakstypeId);

        if (typeof sakstype === 'undefined') {
          const label: string = sakstyper.find(({ id }) => id === sakstypeId)?.navn ?? 'Mangler navn';
          return [...acc, { id: sakstypeId, label, count: 1 }];
        }

        return [...acc.filter(({ id }) => id !== sakstypeId), { ...sakstype, count: (sakstype.count ?? 0) + 1 }];
      }, []),
    [stats, sakstyper]
  );
};
