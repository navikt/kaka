import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import { ISaksdataListParams, useGetIncompleteSaksdataListQuery } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { VurderingerTable } from './table';

export const PaabegynteVurderingerTable = () => {
  const { data: userData } = useUser();

  const query: ISaksdataListParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : {
          saksbehandlerIdent: userData.ident,
        };

  const { data } = useGetIncompleteSaksdataListQuery(query);

  return <VurderingerTable data={data} testId="paabegynte-vurderinger" />;
};
