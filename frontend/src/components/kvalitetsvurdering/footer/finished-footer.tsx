import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useGetSaksdataQuery, useReopenSaksdataMutation } from '../../../redux-api/saksdata';
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
  const { data: userData } = useGetUserDataQuery();
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
    <Knapp
      mini
      onClick={reopen}
      spinner={isReopening}
      autoDisableVedSpinner
      data-testid="reopen-button"
      className="footer-button"
    >
      Endre
    </Knapp>
  );
};
