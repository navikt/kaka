import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useCreateSaksdataMutation } from '../../redux-api/saksdata';
import { FullfoerteRegistreringerTable } from './fullfoerte-registreringer-table';
import { PaabegynteRegistreringerTable } from './paabegynte-registreringer-table';

export const Kvalitetsregistreringer = () => {
  const { data } = useGetUserDataQuery();
  const [createSaksdata] = useCreateSaksdataMutation();
  const history = useHistory();

  const loading = typeof data === 'undefined';

  const createNewSaksdata = () => {
    if (loading) {
      return;
    }

    createSaksdata({
      saksbehandlerIdent: data.ident,
    })
      .unwrap()
      .then(({ id }) => history.push(`/kvalitetsregistreringer/${id}`));
  };

  return (
    <>
      <Header>Klageinstansen Kvalitetsvurdering</Header>
      <Hovedknapp onClick={() => createNewSaksdata()} disabled={loading}>
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