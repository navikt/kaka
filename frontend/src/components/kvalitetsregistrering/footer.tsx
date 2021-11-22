import { Fareknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { isInvalidProperties } from '../../functions/error-type-guard';
import { useCanEdit } from '../../hooks/use-can-edit';
import { useKvalitetsvurderingIsFinished } from '../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '../../hooks/use-saksdata-id';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useDeleteSaksdataMutation, useFullfoerMutation, useGetSaksdataQuery } from '../../redux-api/saksdata';
import { ValidationSummary } from './error-messages';
import { ValidationErrorContext } from './validation-error-context';

export const Footer = () => {
  const finished = useKvalitetsvurderingIsFinished();

  return finished ? <ChangeKvalitetsvurdering /> : <DeleteOrSaveKvalitetsvurdering />;
};

const DeleteOrSaveKvalitetsvurdering = () => {
  const id = useSaksdataId();
  const canEdit = useCanEdit();
  const history = useHistory();
  const { data: userData } = useGetUserDataQuery();
  const { data: saksdata } = useGetSaksdataQuery(id);
  const [finishVurdering, { isLoading: isFinishing }] = useFullfoerMutation();
  const [deleteVurdering, { isLoading: isDeleting }] = useDeleteSaksdataMutation();
  const errorContext = useContext(ValidationErrorContext);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (ref !== null) {
      ref.scrollIntoView();
    }
  }, [ref]);

  if (typeof userData === 'undefined' || typeof saksdata === 'undefined') {
    return null;
  }

  const finish = () => {
    finishVurdering({ saksbehandlerIdent: userData.ident, saksdata })
      .unwrap()
      .then(() => {
        errorContext?.setValidationSectionErrors([]);
      })
      .catch((error) => {
        if (typeof errorContext !== 'undefined' && isInvalidProperties(error)) {
          errorContext.setValidationSectionErrors([
            { section: 'kvalitetsvurdering', properties: error.data['invalid-properties'] },
          ]);
        }
      });
  };

  const deleteSaksdata = async () => {
    try {
      await deleteVurdering({ saksId: id, saksbehandlerIdent: userData.ident });
      history.replace('/kvalitetsregistreringer');
    } catch {
      console.error('Kunne ikke slette kvalitetsvurdering');
    }
  };

  return (
    <StyledFooter ref={setRef}>
      <ValidationSummary />
      <StyledButtons>
        <Fareknapp
          disabled={!canEdit}
          onClick={deleteSaksdata}
          spinner={isDeleting}
          autoDisableVedSpinner
          data-testid="delete-button"
        >
          Slett vurdering
        </Fareknapp>
        <Hovedknapp
          disabled={!canEdit || isDeleting}
          onClick={finish}
          spinner={isFinishing}
          autoDisableVedSpinner
          data-testid="complete-button"
        >
          Fullfør kvalitetsvurdering
        </Hovedknapp>
      </StyledButtons>
    </StyledFooter>
  );
};

const ChangeKvalitetsvurdering = () => (
  <Knapp disabled data-testid="edit-button">
    Endre kvalitetsvurdering
  </Knapp>
);

const StyledButtons = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
`;

const StyledFooter = styled.div`
  width: 36em;

  button:first-child {
    margin-right: 1em;
  }
`;
