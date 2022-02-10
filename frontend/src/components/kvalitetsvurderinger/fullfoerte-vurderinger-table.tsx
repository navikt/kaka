import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import 'nav-frontend-tabell-style';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { ISaksdataListParams, useGetCompleteSaksdataListQuery } from '../../redux-api/saksdata';
import { Table } from './table';

export const FullfoerteVurderingerTable = () => {
  const { data: userData } = useGetUserDataQuery();

  const options: ISaksdataListParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : {
          saksbehandlerIdent: userData.ident,
        };

  const { data } = useGetCompleteSaksdataListQuery(options);

  return <Table data={data} testId="fullfoerte-vurderinger" />;
};
