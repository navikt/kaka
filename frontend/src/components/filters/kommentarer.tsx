import React, { useEffect } from 'react';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { Filter } from './common/filter';
import { useVersionQueryFilter } from './hooks/use-query-filter';
import { FilterType } from './types';

export const KOMMENTARER_KODEVERK: FilterType[] = [
  {
    id: 'utredningen',
    label: 'Utredningen',
  },
  {
    id: 'avvik',
    label: 'Betydelig avvik',
  },
  {
    id: 'opplaering',
    label: 'Opplæring',
  },
];

interface KommentarerFilterProps {
  selected: string[];
  setSelected: (kommentarer: string[]) => void;
}

export const KommentarerFilter = ({ selected, setSelected }: KommentarerFilterProps) => {
  const version = useVersionQueryFilter();

  useEffect(() => {
    if (version !== KvalitetsvurderingVersion.V1 && selected.length !== 0) {
      setSelected([]);
    }
  }, [selected.length, setSelected, version]);

  if (version !== KvalitetsvurderingVersion.V1) {
    return null;
  }

  return <Filter label="Kommentarer" filters={KOMMENTARER_KODEVERK} selected={selected} setSelected={setSelected} />;
};
