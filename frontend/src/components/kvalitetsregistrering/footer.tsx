import AlertStripe from 'nav-frontend-alertstriper';
import { Fareknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { isReduxValidationResponse } from '../../functions/error-type-guard';
import { useCanEdit } from '../../hooks/use-can-edit';
import { useKvalitetsvurderingIsFinished } from '../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '../../hooks/use-saksdata-id';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useDeleteSaksdataMutation, useFullfoerMutation, useGetSaksdataQuery } from '../../redux-api/saksdata';
import { ValidationSummary } from './error-messages';

export const Footer = () => {
  const finished = useKvalitetsvurderingIsFinished();
  return useMemo(() => (finished ? <FinishedKvalitetsvurdering /> : <UnfinishedKvalitetsvurdering />), [finished]);
};

const UnfinishedKvalitetsvurdering = () => {
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

  const Wrapper = hasErrors ? StyledUnfinishedErrorFooter : StyledUnfinishedFooter;
  const statusText = hasErrors ? 'Feil i utfyllingen' : 'Under utfylling';
  const statusType = hasErrors ? 'advarsel' : 'info';

  return (
    <Wrapper>
      <ValidationSummary />
      <StyledButtons>
        <Fareknapp
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
          disabled={!canEdit || isDeleting}
          onClick={finish}
          spinner={isFinishing}
          autoDisableVedSpinner
          data-testid="complete-button"
          className="footer-button"
        >
          Fullfør
        </Hovedknapp>

        <NavLink to={'/kvalitetsregistreringer'} className="knapp footer-button">
          Tilbake
        </NavLink>
      </StyledButtons>
      <AlertStripe type={statusType} form="inline">
        {statusText}
      </AlertStripe>
    </Wrapper>
  );
};

const FinishedKvalitetsvurdering = () => (
  <StyledFinishedFooter>
    <StyledButtons>
      <Knapp disabled data-testid="edit-button" className="footer-button">
        Endre
      </Knapp>
      <NavLink to={'/kvalitetsregistreringer'} className="knapp footer-button">
        Tilbake
      </NavLink>
    </StyledButtons>

    <AlertStripe type="suksess" form="inline">
      Fullført kvalitetsvurdering
    </AlertStripe>
  </StyledFinishedFooter>
);

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  .footer-button {
    margin-right: 1em;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1em;
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
