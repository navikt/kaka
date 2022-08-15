import React from 'react';
import { VEDTAKSINSTANSGRUPPER } from '../../statistikk/total/vedtaksinstansgruppe-filter';
import { QueryParams } from '../filter-query-params';
import { useQueryFilters } from '../hooks/use-query-filter';
import { Pill } from './pills';

interface Props {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
}

export const VedtaksinstansgrupperPills = ({ setFilter }: Props) => {
  const selected = useQueryFilters(QueryParams.VEDTAKSINSTANSGRUPPER);

  const pills = selected.map((vedtaksinstansgruppeId) => {
    const label =
      VEDTAKSINSTANSGRUPPER.find(({ id }) => id === vedtaksinstansgruppeId)?.label ?? vedtaksinstansgruppeId;

    return (
      <Pill
        key={vedtaksinstansgruppeId}
        id={vedtaksinstansgruppeId}
        queryKey={QueryParams.VEDTAKSINSTANSGRUPPER}
        setFilter={setFilter}
        name={label}
        values={selected}
        category="vedtaksinstansgrupper"
      />
    );
  });

  return <>{pills}</>;
};
