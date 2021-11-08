import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useSetTemaMutation } from '../../../redux-api/saksdata';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const Tema = () => {
  const saksId = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setTema] = useSetTemaMutation();
  const canEdit = useCanEdit();
  const temaData = useKodeverkValue('temaer');

  if (typeof saksdata === 'undefined' || typeof temaData === 'undefined') {
    return null;
  }

  const options = temaData.map(({ id, beskrivelse }) => (
    <option value={id} key={id}>
      {beskrivelse}
    </option>
  ));

  const onChange = (selected: string) => {
    const tema = selected.length === 0 ? null : selected;
    setTema({ id: saksId, tema });
  };

  return (
    <StyledItem>
      <Select
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
