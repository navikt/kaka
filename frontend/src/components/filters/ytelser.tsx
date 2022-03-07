import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useMemo } from 'react';
import { useYtelserForEnhet } from '../../hooks/use-kodeverk-value';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface YtelseFilterProps {
  selected: string[];
  setSelected: (ytelser: string[]) => void;
  enhetId?: string;
}

export const YtelseFilter = ({ enhetId, selected, setSelected }: YtelseFilterProps) => {
  const ytelser = useYtelserForEnhet(enhetId ?? skipToken);
  const filters = useMemo<FilterType[]>(() => ytelser.map(({ id, navn }) => ({ label: navn, id })), [ytelser]);

  return <Filter label="Ytelse" filters={filters} selected={selected} setSelected={setSelected} />;
};
