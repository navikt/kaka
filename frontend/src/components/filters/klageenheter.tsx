import { useKlageenheter } from '@app/simple-api-state/use-kodeverk';
import { useMemo } from 'react';
import { Filter } from './common/filter';
import type { FilterType } from './types';

interface Props {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const KlageenheterFilter = ({ selected, setSelected }: Props) => {
  const { data: klageenheter = [] } = useKlageenheter();

  const filters = useMemo<FilterType[]>(
    () => klageenheter.map(({ id, navn }) => ({ label: `${id} - ${navn}`, id })),
    [klageenheter],
  );

  return <Filter label="Klageinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
