import { Button } from '@navikt/ds-react';
import React from 'react';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useGetSaksdataQuery, useReopenSaksdataMutation } from '../../../redux-api/saksdata';
import { useUser } from '../../../simple-api-state/use-user';
import { BackLink } from './back-link';
import { StyledButtons, StyledFinishedFooter } from './styled-components';

export const FinishedFooter = () => (
  <StyledFinishedFooter>
    <StyledButtons>
      <Reopen />
      <BackLink />
    </StyledButtons>
  </StyledFinishedFooter>
);

const Reopen = () => {
  const id = useSaksdataId();
  const { data: userData } = useUser();
  const { data: saksdata } = useGetSaksdataQuery(id);
  const [reopenVurdering, { isLoading: isReopening }] = useReopenSaksdataMutation();

  if (typeof userData === 'undefined' || typeof saksdata === 'undefined') {
    return null;
  }

  const canReopen = saksdata.avsluttetAvSaksbehandler !== null && saksdata.utfoerendeSaksbehandler === userData.ident;

  if (!canReopen) {
    return null;
  }

  const reopen = () => reopenVurdering({ saksbehandlerIdent: userData.ident, saksdata });

  return (
    <Button variant="secondary" size="small" onClick={reopen} loading={isReopening} data-testid="reopen-button">
      Endre
    </Button>
  );
};
