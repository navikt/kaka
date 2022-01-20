import React from 'react';
import { useHjemmelTexts } from '../hooks/use-hjemmel-texts';
import { useQueryFilters } from '../hooks/use-query-filter';
import { Pill } from '../pills/pills';
import { QueryParams } from '../types';

interface FilteredHjemlerPillsProps {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
}

export const FilteredHjemlerPills = ({ setFilter }: FilteredHjemlerPillsProps) => {
  const hjemler = useHjemmelTexts([]);
  const selectedHjemler = useQueryFilters(QueryParams.HJEMLER);

  const pills = selectedHjemler.map((hjemmelId) => {
    const label = hjemler.find(({ id }) => id === hjemmelId)?.label ?? hjemmelId;

    return (
      <Pill
        key={hjemmelId}
        id={hjemmelId}
        queryKey={QueryParams.HJEMLER}
        setFilter={setFilter}
        name={label}
        values={selectedHjemler}
      />
    );
  });

  return <>{pills}</>;
};
