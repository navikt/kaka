import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useSetUtfallMutation } from '../../../redux-api/saksdata';
import { isUtfall } from '../../../types/utfall';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const UtfallResultat = () => {
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setUtfallResultat] = useSetUtfallMutation();
  const canEdit = useCanEdit();
  const utfall = useKodeverkValue('utfall');

  if (typeof saksdata === 'undefined' || typeof utfall === 'undefined') {
    return null;
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const utfallValue = isUtfall(target.value) ? target.value : null;
    setUtfallResultat({ id, utfall: utfallValue });
  };

  const options = utfall.map(({ id: utfallId, navn }) => (
    <option key={utfallId} value={utfallId}>
      {navn}
    </option>
  ));

  return (
    <StyledItem>
      <Select label="Utfall/resultat:" onChange={onChange} disabled={!canEdit} bredde="m" value={saksdata.utfall ?? ''}>
        <EmptyOption show={saksdata.utfall === null} />
        {options}
      </Select>
    </StyledItem>
  );
};
