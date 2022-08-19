import { Button } from '@navikt/ds-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { isReduxValidationResponse } from '../../../functions/error-type-guard';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useDeleteSaksdataMutation, useFullfoerMutation } from '../../../redux-api/saksdata';
import { useUser } from '../../../simple-api-state/use-user';
import { BackLink } from './back-link';
import { StyledButtons, StyledUnfinishedErrorFooter, StyledUnfinishedFooter } from './styled-components';
import { ValidationSummaryPopup } from './validation-summary-popup';

export const UnfinishedFooter = () => {
  const id = useSaksdataId();
  const canEdit = useCanEdit();
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const [saksdata] = useSaksdata();
  const [finishVurdering, { isLoading: isFinishing, error }] = useFullfoerMutation({
    fixedCacheKey: id,
  });
  const [deleteVurdering, { isLoading: isDeleting }] = useDeleteSaksdataMutation();

  if (typeof userData === 'undefined' || typeof saksdata === 'undefined') {
    return null;
  }

  const finish = () => {
    if (saksdata.avsluttetAvSaksbehandler === null) {
      finishVurdering({ saksbehandlerIdent: userData.ident, saksdata });
    }
  };

  const deleteSaksdata = async () => {
    try {
      await deleteVurdering({ saksId: id, saksbehandlerIdent: userData.ident });
      navigate('/kvalitetsvurderinger', { replace: true });
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
        <Button
          size="small"
          variant="primary"
          disabled={isDeleting}
          onClick={finish}
          loading={isFinishing}
          data-testid="complete-button"
        >
          Fullfør
        </Button>

        <BackLink />

        <Button size="small" variant="danger" onClick={deleteSaksdata} loading={isDeleting} data-testid="delete-button">
          Slett
        </Button>
      </StyledButtons>

      <ValidationSummaryPopup hasErrors={hasErrors} />
    </Wrapper>
  );
};
