import { isReduxValidationResponse } from '@app/functions/error-type-guard';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useDeleteSaksdataMutation, useFullfoerMutation } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { Button } from '@navikt/ds-react';
import { useNavigate } from 'react-router';
import { BackLink } from './back-link';
import { StyledButtons, StyledUnfinishedErrorFooter, StyledUnfinishedFooter } from './styled-components';
import { ValidationSummaryPopup } from './validation-summary-popup';

export const UnfinishedFooter = () => {
  const id = useSaksdataId();
  const canEdit = useCanEdit();
  const navigate = useNavigate();
  const userData = useUser();
  const { data: saksdata } = useSaksdata();
  const [finishVurdering, { isLoading: isFinishing, error }] = useFullfoerMutation({
    fixedCacheKey: id,
  });
  const [deleteVurdering, { isLoading: isDeleting }] = useDeleteSaksdataMutation();

  if (typeof saksdata === 'undefined') {
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
