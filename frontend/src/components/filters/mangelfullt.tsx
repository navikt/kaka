import { Filter } from './common/filter';
import type { FilterType } from './types';

export const MANGELFULLT_KODEVERK: FilterType[] = [
  {
    id: 'forberedelsen',
    label: 'Klageforberedelsen',
  },
  {
    id: 'utredningen',
    label: 'Utredningen',
  },
  {
    id: 'rol',
    label: 'Rådgivende lege',
  },
  {
    id: 'vedtaket',
    label: 'Vedtaket',
  },
];

interface MangelfulltFilterProps {
  selected: string[];
  setSelected: (mangelfullt: string[]) => void;
}

export const MangelfulltFilter = ({ selected, setSelected }: MangelfulltFilterProps): JSX.Element => (
  <Filter label="Mangelfullt" filters={MANGELFULLT_KODEVERK} selected={selected} setSelected={setSelected} />
);
