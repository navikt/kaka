import { skipToken } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { useGetSaksbehandlereQuery } from '../../redux-api/statistics';
import { useUser } from '../../simple-api-state/use-user';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Props {
  selected: string[];
  setSelected: (saksbehandlere: string[]) => void;
}

export const SaksbehandlerFilter = ({ selected, setSelected }: Props) => {
  const { data: user } = useUser();
  const { data } = useGetSaksbehandlereQuery(typeof user === 'undefined' ? skipToken : user.ansattEnhet.id);

  const saksbehandlere: FilterType[] = data?.map(({ navIdent, navn }) => ({ id: navIdent, label: navn })) ?? [];

  return <Filter label="Saksbehandler" selected={selected} filters={saksbehandlere} setSelected={setSelected} />;
};
