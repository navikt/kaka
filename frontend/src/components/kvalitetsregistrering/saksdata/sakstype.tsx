import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSetSakstypeMutation } from '../../../redux-api/saksdata';
import { SakstypeEnum, isSakstype } from '../../../types/sakstype';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const Sakstype = () => {
  const [saksdata] = useSaksdata();
  const [updateSakstype] = useSetSakstypeMutation();
  const sakstyper = useKodeverkValue('sakstyper');
  const canEdit = useCanEdit();

  if (typeof saksdata === 'undefined' || typeof sakstyper === 'undefined') {
    return null;
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const sakstype = isSakstype(target.value) ? target.value : null;
    updateSakstype({ id: saksdata.id, sakstype });
  };

  return (
    <StyledItem>
      <Select
        label="Sakstype"
        onChange={onChange}
        bredde="m"
        disabled={!canEdit}
        defaultValue={saksdata.sakstype ?? SakstypeEnum.KLAGE}
      >
        <EmptyOption show={saksdata.sakstype === null} />
        {sakstyper.map(({ id, navn }) => (
          <option key={id} value={id}>
            {navn}
          </option>
        ))}
      </Select>
    </StyledItem>
  );
};
