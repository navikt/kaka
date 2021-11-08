import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useSetTemaMutation } from '../../../redux-api/saksdata';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const Tema = () => {
  const { data: user } = useGetUserDataQuery();
  const saksId = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setTema] = useSetTemaMutation();
  const canEdit = useCanEdit();
  const temaData = useKodeverkValue('temaer');
  const validationError = useValidationError('tema');

  if (typeof saksdata === 'undefined' || typeof temaData === 'undefined' || typeof user === 'undefined') {
    return null;
  }

  const options = temaData.map(({ id, beskrivelse }) => (
    <option value={id} key={id}>
      {beskrivelse}
    </option>
  ));

  const onChange = (selected: string) => {
    const tema = selected.length === 0 ? null : selected;
    setTema({ id: saksId, tema, saksbehandlerIdent: user.ident });
  };

  return (
    <StyledItem>
      <Select
        feil={validationError}
        label="Tema"
        onChange={({ target }) => onChange(target.value)}
        disabled={!canEdit}
        bredde="m"
        value={saksdata.tema ?? ''}
      >
        <EmptyOption show={saksdata.tema === null} />
        {options}
      </Select>
    </StyledItem>
  );
};
