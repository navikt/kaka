import React from 'react';
import { Filter } from './common/filter';
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

export const KommentarerFilter = ({ selected, setSelected }: KommentarerFilterProps): JSX.Element => (
  <Filter label="Kommentarer" filters={KOMMENTARER_KODEVERK} selected={selected} setSelected={setSelected} />
);
