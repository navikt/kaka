import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useCreateSaksdataMutation } from '../../redux-api/saksdata';
import { FullfoerteRegistreringerTable } from './fullfoerte-registreringer-table';
import { PaabegynteRegistreringerTable } from './paabegynte-registreringer-table';

export const Kvalitetsregistreringer = () => {
  const { data: userData } = useGetUserDataQuery();
  const [createSaksdata] = useCreateSaksdataMutation();
  const navigate = useNavigate();

  const loading = typeof userData === 'undefined';

  const disabled = loading || userData.klageenheter.length === 0;

  const createNewSaksdata = () => {
    if (disabled) {
      return;
    }

    createSaksdata({
      saksbehandlerIdent: userData.ident,
      tilknyttetEnhet: userData.klageenheter[0].navn,
    })
      .unwrap()
      .then(({ id }) => navigate(`/kvalitetsregistreringer/${id}`));
  };

  return (
    <StyledKvalitetsregistreringer>
      <Hovedknapp onClick={() => createNewSaksdata()} disabled={disabled} data-testid="new-kvalitetsvurdering-button">
        Ny kvalitetsvurdering
      </Hovedknapp>

      <SubHeader>Påbegynte vurderinger</SubHeader>
      <PaabegynteRegistreringerTable />

      <SubHeader>Fullførte vurderinger siste 7 dager</SubHeader>
      <FullfoerteRegistreringerTable />
    </StyledKvalitetsregistreringer>
  );
};

const SubHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: 3em;
  margin-bottom: 0;
`;

const StyledKvalitetsregistreringer = styled.section`
  padding-top: 2em;
  width: 100%;
`;
