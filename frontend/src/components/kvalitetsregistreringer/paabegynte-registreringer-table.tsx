import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import 'nav-frontend-tabell-style';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { ISaksdataListParams, useGetIncompleteSaksdataListQuery } from '../../redux-api/saksdata';
import { Table } from './table';

export const PaabegynteRegistreringerTable = () => {
  const { data: userData } = useGetUserDataQuery();

  const query: ISaksdataListParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : {
          saksbehandlerIdent: userData.ident,
        };

  const { data } = useGetIncompleteSaksdataListQuery(query);

  return <Table data={data} testId="paabegynte-registreringer" />;
};
