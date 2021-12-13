import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useKodeverkValue } from '../../hooks/use-kodeverk-value';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useCreateSaksdataMutation } from '../../redux-api/saksdata';
import { FullfoerteRegistreringerTable } from './fullfoerte-registreringer-table';
import { PaabegynteRegistreringerTable } from './paabegynte-registreringer-table';

export const Kvalitetsregistreringer = () => {
  const { data: userData } = useGetUserDataQuery();
  const [createSaksdata] = useCreateSaksdataMutation();
  const enheter = useKodeverkValue('enheter');
  const navigate = useNavigate();

  const loading = typeof userData === 'undefined' || typeof enheter === 'undefined';

  const createNewSaksdata = () => {
    if (loading) {
      return;
    }

    createSaksdata({
      saksbehandlerIdent: userData.ident,
      tilknyttetEnhet: enheter[0].id,
    })
      .unwrap()
      .then(({ id }) => navigate(`/kvalitetsregistreringer/${id}`));
  };

  return (
    <>
      <Header>Klageinstansen Kvalitetsvurdering</Header>
      <Hovedknapp onClick={() => createNewSaksdata()} disabled={loading} data-testid="new-kvalitetsvurdering-button">
        Ny kvalitetsvurdering
      </Hovedknapp>

      <SubHeader>Påbegynte vurderinger</SubHeader>
      <PaabegynteRegistreringerTable />

      <SubHeader>Fullførte vurderinger siste 7 dager</SubHeader>
      <FullfoerteRegistreringerTable />
    </>
  );
};

const Header = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: #54483f;
`;

const SubHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: 3em;
  margin-bottom: 0;
`;
