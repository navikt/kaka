import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useNavigate } from 'react-router';
import { isReduxValidationResponse } from '../../../functions/error-type-guard';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useDeleteSaksdataMutation, useFullfoerMutation, useGetSaksdataQuery } from '../../../redux-api/saksdata';
import { BackLink } from './back-link';
import { StyledButtons, StyledUnfinishedErrorFooter, StyledUnfinishedFooter } from './styled-components';
import { ValidationSummaryPopup } from './validation-summary-popup';

export const UnfinishedFooter = () => {
  const id = useSaksdataId();
  const canEdit = useCanEdit();
  const navigate = useNavigate();
  const { data: userData } = useGetUserDataQuery();
  const { data: saksdata } = useGetSaksdataQuery(id);
  const [finishVurdering, { isLoading: isFinishing, error }] = useFullfoerMutation({
    fixedCacheKey: id,
  });
  const [deleteVurdering, { isLoading: isDeleting }] = useDeleteSaksdataMutation();

  if (typeof userData === 'undefined' || typeof saksdata === 'undefined') {
    return null;
  }

  const finish = () => finishVurdering({ saksbehandlerIdent: userData.ident, saksdata });

  const deleteSaksdata = async () => {
    try {
      await deleteVurdering({ saksId: id, saksbehandlerIdent: userData.ident });
      navigate('/kvalitetsregistreringer', { replace: true });
    } catch {
      console.error('Kunne ikke slette kvalitetsvurdering');
    }
  };

  const hasErrors = isReduxValidationResponse(error) && error.data.sections.length !== 0;

  if (!canEdit) {
    return (
      <StyledButtons>
        <BackLink />
      </StyledButtons>
    );
  }

  const Wrapper = hasErrors ? StyledUnfinishedErrorFooter : StyledUnfinishedFooter;

  return (
    <Wrapper>
      <StyledButtons>
        <Hovedknapp
          mini
          disabled={isDeleting}
          onClick={finish}
          spinner={isFinishing}
          autoDisableVedSpinner
          data-testid="complete-button"
          className="footer-button"
        >
          Fullfør
        </Hovedknapp>

        <BackLink />

        <Fareknapp
          mini
          onClick={deleteSaksdata}
          spinner={isDeleting}
          autoDisableVedSpinner
          data-testid="delete-button"
          className="footer-button"
        >
          Slett
        </Fareknapp>
      </StyledButtons>

      <ValidationSummaryPopup hasErrors={hasErrors} />
    </Wrapper>
  );
};
