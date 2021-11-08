import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React from 'react';
import 'nav-frontend-tabell-style';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { ISaksdataListParams, useGetCompleteSaksdataListQuery } from '../../redux-api/saksdata';
import { TableHeader } from './header';
import { RegistreringRader } from './rows';
import { SakCounter } from './sak-counter';
import { StyledTable, StyledTableContainer } from './styled-components';

export const FullfoerteRegistreringerTable = () => {
  const { data: userData } = useGetUserDataQuery();

  const options: ISaksdataListParams | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : {
          saksbehandlerIdent: userData.ident,
        };

  const { data } = useGetCompleteSaksdataListQuery(options);

  const registreringerHeaderTitles: (string | null)[] = [
    'Type',
    'Tema',
    'Saken gjelder',
    'Sist endret',
    'Utfall',
    null,
  ];

  return (
    <>
      <StyledTableContainer>
        <StyledTable className="tabell tabell--stripet" data-testid="paabegynte-registreringer-table">
          <TableHeader headers={registreringerHeaderTitles} />
          <RegistreringRader registreringer={data} columnCount={registreringerHeaderTitles.length} />
        </StyledTable>
      </StyledTableContainer>
      <SakCounter list={data} />
    </>
  );
};
