import { Fareknapp, Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { isReduxValidationResponse } from '../../../functions/error-type-guard';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKvalitetsvurderingIsFinished } from '../../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useDeleteSaksdataMutation, useFullfoerMutation, useGetSaksdataQuery } from '../../../redux-api/saksdata';
import { ValidationSummaryPopup } from './validation-summary-popup';

export const Footer = () => {
  const id = useSaksdataId();
  const canEdit = useCanEdit();
  const navigate = useNavigate();
  const { data: userData } = useGetUserDataQuery();
  const { data: saksdata } = useGetSaksdataQuery(id);
  const [finishVurdering, { isLoading: isFinishing, error }] = useFullfoerMutation({
    fixedCacheKey: id,
  });
  const [deleteVurdering, { isLoading: isDeleting }] = useDeleteSaksdataMutation();
  const isFinished = useKvalitetsvurderingIsFinished();

  if (typeof userData === 'undefined' || typeof saksdata === 'undefined') {
    return null;
  }

  const finish = () => {
    finishVurdering({ saksbehandlerIdent: userData.ident, saksdata });
  };

  const deleteSaksdata = async () => {
    try {
      await deleteVurdering({ saksId: id, saksbehandlerIdent: userData.ident });
      navigate('/kvalitetsregistreringer', { replace: true });
    } catch {
      console.error('Kunne ikke slette kvalitetsvurdering');
    }
  };

  const hasErrors = isReduxValidationResponse(error) && error.data.sections.length !== 0;

  const children = (
    <>
      <StyledButtons>
        <Fareknapp
          mini
          disabled={!canEdit}
          onClick={deleteSaksdata}
          spinner={isDeleting}
          autoDisableVedSpinner
          data-testid="delete-button"
          className="footer-button"
        >
          Slett
        </Fareknapp>
        <Hovedknapp
          mini
          disabled={!canEdit || isDeleting}
          onClick={finish}
          spinner={isFinishing}
          autoDisableVedSpinner
          data-testid="complete-button"
          className="footer-button"
        >
          Fullfør
        </Hovedknapp>

        <NavLink to={'/kvalitetsregistreringer'} className="knapp knapp--mini footer-button">
          Tilbake
        </NavLink>
      </StyledButtons>

      <ValidationSummaryPopup hasErrors={hasErrors} />
    </>
  );

  if (isFinished) {
    return <StyledFinishedFooter>{children}</StyledFinishedFooter>;
  }

  if (hasErrors) {
    return <StyledUnfinishedErrorFooter>{children}</StyledUnfinishedErrorFooter>;
  }

  return <StyledUnfinishedFooter>{children}</StyledUnfinishedFooter>;
};

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;

  .footer-button {
    width: 200px;
    margin-right: 1em;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  position: sticky;
  bottom: 0em;
  left: 0;
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 0.5em;
  padding-top: 0.5em;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const StyledFinishedFooter = styled(StyledFooter)`
  border-top: 1px solid #06893a;
  background-color: #cde7d8;
`;

const StyledUnfinishedFooter = styled(StyledFooter)`
  border-top: 1px solid #368da8;
  background-color: #e0f5fb;
`;

const StyledUnfinishedErrorFooter = styled(StyledFooter)`
  border-top: 1px solid #d47b00;
  background-color: #ffe9cc;
`;
