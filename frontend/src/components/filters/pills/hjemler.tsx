import React from 'react';
import { useRegistreringshjemlerMap } from '../../../simple-api-state/use-kodeverk';
import { QueryParams } from '../../filters/filter-query-params';
import { useQueryFilters } from '../hooks/use-query-filter';
import { Pill } from './pills';

interface FilteredHjemlerPillsProps {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
}

export const FilteredHjemlerPills = ({ setFilter }: FilteredHjemlerPillsProps) => {
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);
  const { data: hjemler } = useRegistreringshjemlerMap();

  if (selectedHjemler.length === 0 || typeof hjemler === 'undefined') {
    return null;
  }

  const pills = selectedHjemler.map((hjemmelId) => {
    const hjemmel = hjemler[hjemmelId];

    const label = typeof hjemmel === 'undefined' ? hjemmelId : `${hjemmel.lovkilde.beskrivelse} ${hjemmel.hjemmelnavn}`;

    return (
      <Pill
        key={hjemmelId}
        id={hjemmelId}
        queryKey={QueryParams.HJEMLER}
        setFilter={setFilter}
        name={label}
        values={selectedHjemler}
        category="hjemler"
      />
    );
  });

  return <>{pills}</>;
};
