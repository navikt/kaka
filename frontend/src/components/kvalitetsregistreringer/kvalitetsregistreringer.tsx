import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useCreateSaksdataMutation } from '../../redux-api/saksdata';
import { ExcelExport } from '../excel-export/excel-export';
import { FullfoerteRegistreringerTable } from './fullfoerte-registreringer-table';
import { PaabegynteRegistreringerTable } from './paabegynte-registreringer-table';

export const Kvalitetsregistreringer = () => {
  const { data: userData } = useGetUserDataQuery();
  const [createSaksdata] = useCreateSaksdataMutation();
  const navigate = useNavigate();

  const loading = typeof userData === 'undefined';

  const createNewSaksdata = () => {
    if (loading) {
      return;
    }

    createSaksdata({
      saksbehandlerIdent: userData.ident,
      tilknyttetEnhet: userData.klageenheter[0].id,
    })
      .unwrap()
      .then(({ id }) => navigate(`/kvalitetsregistreringer/${id}`));
  };

  return (
    <>
      <Hovedknapp onClick={() => createNewSaksdata()} disabled={loading} data-testid="new-kvalitetsvurdering-button">
        Ny kvalitetsvurdering
      </Hovedknapp>

      <ExcelExport />

      <SubHeader>Påbegynte vurderinger</SubHeader>
      <PaabegynteRegistreringerTable />

      <SubHeader>Fullførte vurderinger siste 7 dager</SubHeader>
      <FullfoerteRegistreringerTable />
    </>
  );
};

const SubHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: 3em;
  margin-bottom: 0;
`;
