import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import 'nav-frontend-tabell-style';
import { ISaksdataListParams, useGetCompleteSaksdataListQuery } from '../../redux-api/saksdata';
import { useUser } from '../../simple-api-state/use-user';
import { VurderingerTable } from './table';

export const FullfoerteVurderingerTable = () => {
  const { data: userData } = useUser();

  const options: ISaksdataListParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : {
          saksbehandlerIdent: userData.ident,
        };

  const { data } = useGetCompleteSaksdataListQuery(options);

  return <VurderingerTable data={data} testId="fullfoerte-vurderinger" />;
};
