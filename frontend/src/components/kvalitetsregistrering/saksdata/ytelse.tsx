import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useYtelserPerEnhet } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useSetYtelseMutation } from '../../../redux-api/saksdata';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const Ytelse = () => {
  const { data: user } = useGetUserDataQuery();
  const saksId = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setYtelse] = useSetYtelseMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('ytelseId');
  const allowedYtelser = useYtelserPerEnhet(saksdata?.tilknyttetEnhet ?? skipToken);

  if (typeof saksdata === 'undefined' || typeof user === 'undefined') {
    return null;
  }

  const options = allowedYtelser.map(({ id, beskrivelse }) => (
    <option value={id} key={id}>
      {beskrivelse}
    </option>
  ));

  const onChange = (selected: string) => {
    const ytelseId = selected.length === 0 ? null : selected;
    setYtelse({ id: saksId, ytelseId, saksbehandlerIdent: user.ident });
  };

  return (
    <StyledItem>
      <Select
        feil={validationError}
        label="Ytelse"
        onChange={({ target }) => onChange(target.value)}
        disabled={!canEdit}
        bredde="m"
        value={saksdata.ytelseId ?? ''}
        data-testid="ytelse-select"
      >
        <EmptyOption show={saksdata.ytelseId === null} />
        {options}
      </Select>
    </StyledItem>
  );
};
