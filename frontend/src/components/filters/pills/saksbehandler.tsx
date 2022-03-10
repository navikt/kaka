import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useGetSaksbehandlereQuery } from '../../../redux-api/statistics';
import { QueryParams } from '../../filters/filter-query-params';
import { useQueryFilters } from '../hooks/use-query-filter';
import { Pill } from './pills';

interface Props {
  setFilter: (filter: QueryParams, ...values: string[]) => void;
}

export const FilteredSaksbehandlerPills = ({ setFilter }: Props) => {
  const { data: user } = useGetUserDataQuery();
  const { data } = useGetSaksbehandlereQuery(typeof user === 'undefined' ? skipToken : user.ansattEnhet.id);

  const saksbehandlere = data ?? [];
  const selectedSaksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  const pills = selectedSaksbehandlere.map((id) => {
    const label = saksbehandlere.find(({ navIdent }) => id === navIdent)?.navn ?? id;

    return (
      <Pill
        key={id}
        id={id}
        queryKey={QueryParams.SAKSBEHANDLERE}
        setFilter={setFilter}
        name={label}
        values={selectedSaksbehandlere}
        category="saksbehandler"
      />
    );
  });

  return <>{pills}</>;
};
