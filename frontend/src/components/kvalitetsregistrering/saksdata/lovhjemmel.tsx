import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useHjemlerForYtelse } from '../../../hooks/use-kodeverk-value';
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
  const hjemlerForYtelse = useHjemlerForYtelse(saksdata?.ytelseId ?? skipToken);
  const [localHjemler, setLocalHjemler] = useState<string[]>(saksdata?.hjemmelIdList ?? []);
  const validationError = useValidationError('hjemmelIdList');

  useEffect(() => {
    if (typeof saksdata === 'undefined') {
      return;
    }

    setLocalHjemler(saksdata.hjemmelIdList);
  }, [saksdata, setLocalHjemler]);

  const options = useMemo(
    () => hjemlerForYtelse.map(({ id, navn }) => ({ value: id, label: navn })),
    [hjemlerForYtelse]
  );

  const selected = useMemo(
    () => hjemlerForYtelse.filter(({ id }) => localHjemler.includes(id)),
    [hjemlerForYtelse, localHjemler]
  );

  const children = selected.map(({ id, navn }) => (
    <StyledLovhjemmelLabel key={id}>
      <LabelLovhjemmel>{navn}</LabelLovhjemmel>
    </StyledLovhjemmelLabel>
  ));

  const title = <StyledLovhjemmelLabels>{children}</StyledLovhjemmelLabels>;

  const noHjemler = hjemlerForYtelse.length === 0;

  const onLovhjemmelChange = (hjemmelIdList: string[]) => {
    if (typeof user === 'undefined') {
      return;
    }

    setLocalHjemler(hjemmelIdList);
    updateHjemler({ id: saksdataId, hjemmelIdList, saksbehandlerIdent: user.ident });
  };

  return (
    <StyledLabel>
      <StyledLabelText>Utfallet er basert på lovhjemmel:</StyledLabelText>
      <MultiSelect
        disabled={!canEdit || noHjemler}
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
