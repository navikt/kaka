import { useVedtaksenheter } from '@app/simple-api-state/use-kodeverk';
import { useMemo } from 'react';
import { Filter } from './common/filter';
import type { FilterType } from './types';

interface Props {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const VedtaksenheterFilter = ({ selected, setSelected }: Props) => {
  const { data: vedtaksenheter = [] } = useVedtaksenheter();

  const filters = useMemo<FilterType[]>(
    () => vedtaksenheter.map(({ id, navn }) => ({ label: `${id} - ${navn}`, id })),
    [vedtaksenheter],
  );

  return <Filter label="Vedtaksinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
