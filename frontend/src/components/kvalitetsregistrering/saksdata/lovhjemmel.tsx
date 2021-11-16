import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useHjemlerForTema } from '../../../hooks/use-kodeverk-value';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useGetSaksdataQuery, useSetHjemlerMutation } from '../../../redux-api/saksdata';
import { LabelLovhjemmel } from '../../../styled-components/labels';
import { MultiSelect } from '../../multi-select/multi-select';
import { StyledLabelText } from './styled-components';

export const Lovhjemmel = () => {
  const { data: user } = useGetUserDataQuery();
  const [updateHjemler] = useSetHjemlerMutation();
  const saksdataId = useSaksdataId();
  const { data: saksdata } = useGetSaksdataQuery(saksdataId);
  const canEdit = useCanEdit();
  const hjemlerForTema = useHjemlerForTema(saksdata?.tema ?? skipToken);
  const [localHjemler, setLocalHjemler] = useState<string[]>(saksdata?.hjemler ?? []);
  const validationError = useValidationError('hjemler');

  useEffect(() => {
    if (typeof saksdata === 'undefined') {
      return;
    }

    setLocalHjemler(saksdata.hjemler);
  }, [saksdata, setLocalHjemler]);

  const options = useMemo(() => hjemlerForTema.map(({ id, navn }) => ({ value: id, label: navn })), [hjemlerForTema]);

  const selected = useMemo(
    () => hjemlerForTema.filter(({ id }) => localHjemler.includes(id)),
    [hjemlerForTema, localHjemler]
  );

  const children = selected.map(({ id, navn }) => (
    <StyledLovhjemmelLabel key={id}>
      <LabelLovhjemmel>{navn}</LabelLovhjemmel>
    </StyledLovhjemmelLabel>
  ));

  const title = <StyledLovhjemmelLabels>{children}</StyledLovhjemmelLabels>;

  const onLovhjemmelChange = (hjemler: string[]) => {
    if (typeof user === 'undefined') {
      return;
    }

    setLocalHjemler(hjemler);
    updateHjemler({ id: saksdataId, hjemler, saksbehandlerIdent: user.ident });
  };

  return (
    <StyledLabel>
      <StyledLabelText>Utfallet er basert på lovhjemmel:</StyledLabelText>
      <MultiSelect
        disabled={!canEdit}
        options={options}
        title={title}
        selected={localHjemler}
        onChange={onLovhjemmelChange}
        error={validationError}
        data-testid="lovhjemmel"
      />
    </StyledLabel>
  );
};

const StyledLovhjemmelLabel = styled.span`
  margin: 0.25em;

  &:last-of-type {
    margin-right: 0;
  }
`;

const StyledLabel = styled.label`
  width: 16em;
  display: block;
`;

const StyledLovhjemmelLabels = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -0.25em;
`;
