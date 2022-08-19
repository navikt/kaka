import { Notes } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useCreateSaksdataMutation } from '../../redux-api/saksdata';
import { useUser } from '../../simple-api-state/use-user';
import { FullfoerteVurderingerTable } from './fullfoerte-vurderinger-table';
import { PaabegynteVurderingerTable } from './paabegynte-vurderinger-table';

export const Kvalitetsvurderinger = () => {
  const { data: userData, isLoading } = useUser();
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
      <Button
        onClick={() => createNewSaksdata()}
        disabled={disabled}
        data-testid="new-kvalitetsvurdering-button"
        icon={<Notes aria-hidden />}
      >
        Ny kvalitetsvurdering
      </Button>

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
