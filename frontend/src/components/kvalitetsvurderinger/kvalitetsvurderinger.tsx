import { Notes } from '@navikt/ds-icons';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useCreateSaksdataMutation } from '../../redux-api/saksdata';
import { FullfoerteVurderingerTable } from './fullfoerte-vurderinger-table';
import { PaabegynteVurderingerTable } from './paabegynte-vurderinger-table';

export const Kvalitetsvurderinger = () => {
  const { data: userData, isLoading } = useGetUserDataQuery();
  const [createSaksdata] = useCreateSaksdataMutation();
  const navigate = useNavigate();

  const disabled = isLoading || typeof userData === 'undefined';

  const createNewSaksdata = () => {
    if (disabled) {
      return;
    }

    createSaksdata({
      saksbehandlerIdent: userData.ident,
    })
      .unwrap()
      .then(({ id }) => navigate(`/kvalitetsvurderinger/${id}`));
  };

  return (
    <StyledKvalitetsvurderinger>
      <StyledNewButton
        onClick={() => createNewSaksdata()}
        disabled={disabled}
        data-testid="new-kvalitetsvurdering-button"
      >
        <Notes /> Ny kvalitetsvurdering
      </StyledNewButton>

      <SubHeader>Påbegynte vurderinger</SubHeader>
      <PaabegynteVurderingerTable />

      <SubHeader>Fullførte vurderinger siste 7 dager</SubHeader>
      <FullfoerteVurderingerTable />
    </StyledKvalitetsvurderinger>
  );
};

const SubHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: 3em;
  margin-bottom: 0;
`;

const StyledKvalitetsvurderinger = styled.section`
  padding-top: 2em;
  width: 100%;
`;

const StyledNewButton = styled(Hovedknapp)`
  display: flex;
  gap: 8px;
  align-items: center;
`;
