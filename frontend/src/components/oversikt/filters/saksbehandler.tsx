import { skipToken } from '@reduxjs/toolkit/dist/query';
import React from 'react';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useGetSaksbehandlereQuery } from '../../../redux-api/statistics';
import { Filter } from './common/filter';

interface Props {
  selected: string[];
  setSelected: (saksbehandlere: string[]) => void;
}

export const SaksbehandlerFilter = ({ selected, setSelected }: Props) => {
  const { data: user } = useGetUserDataQuery();
  const { data } = useGetSaksbehandlereQuery(typeof user === 'undefined' ? skipToken : user.ansattEnhet.navn);

  const saksbehandlere =
    typeof data === 'undefined' ? [] : data.map(({ navIdent, navn }) => ({ id: navIdent, label: navn }));

  return <Filter label="Saksbehandler" selected={selected} filters={saksbehandlere} setSelected={setSelected} />;
};
