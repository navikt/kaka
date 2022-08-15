import React, { useMemo } from 'react';
import { useKodeverkValueDefault } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Props {
  selected: string[];
  setSelected: (enheter: string[]) => void;
}

export const VedtaksenheterFilter = ({ selected, setSelected }: Props) => {
  const vedtaksenheter = useKodeverkValueDefault('vedtaksenheter');

  const filters = useMemo<FilterType[]>(
    () => vedtaksenheter.map(({ id, navn }) => ({ label: `${id} - ${navn}`, id })),
    [vedtaksenheter]
  );

  return <Filter label="Vedtaksinstans" selected={selected} filters={filters} setSelected={setSelected} />;
};
