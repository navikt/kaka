import { Fareknapp, Hovedknapp, Knapp } from 'nav-frontend-knapper';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { ApiValidationError } from '../../functions/error-type-guard';
import { useCanEdit } from '../../hooks/use-can-edit';
import { useKvalitetsvurderingIsFinished } from '../../hooks/use-kvalitetsvurdering-is-finished';
import { useSaksdataId } from '../../hooks/use-saksdata-id';
import { useGetUserDataQuery } from '../../redux-api/metadata';
import { useDeleteSaksdataMutation, useFullfoerMutation, useGetSaksdataQuery } from '../../redux-api/saksdata';
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

  if (typeof userData === 'undefined' || typeof saksdata === 'undefined') {
    return null;
  }

  const finish = () => {
    finishVurdering({ saksbehandlerIdent: userData.ident, saksdata })
      .unwrap()
      .then(() => errorContext?.setValidationErrors([]))
      .catch((error) => {
        if (typeof errorContext !== 'undefined' && ApiValidationError.is(error)) {
          errorContext.setValidationErrors(error.data['invalid-properties']);
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
    <StyledFooter>
      <Fareknapp disabled={!canEdit} onClick={deleteSaksdata} spinner={isDeleting} autoDisableVedSpinner>
        Slett vurdering
      </Fareknapp>
      <Hovedknapp disabled={!canEdit || isDeleting} onClick={finish} spinner={isFinishing} autoDisableVedSpinner>
        Fullfør kvalitetsvurdering
      </Hovedknapp>
    </StyledFooter>
  );
};

const ChangeKvalitetsvurdering = () => <Knapp disabled>Endre kvalitetsvurdering</Knapp>;

const StyledFooter = styled.div`
  display: flex;

  button:first-child {
    margin-right: 1em;
  }
`;
