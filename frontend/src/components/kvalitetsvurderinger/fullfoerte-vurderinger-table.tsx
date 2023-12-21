import { skipToken } from '@reduxjs/toolkit/query';
import React from 'react';
import { ISaksdataListParams, useGetCompleteSaksdataListQuery } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
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
