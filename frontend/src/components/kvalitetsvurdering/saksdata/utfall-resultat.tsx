import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useSaksdataId } from '../../../hooks/use-saksdata-id';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetUtfallMutation } from '../../../redux-api/saksdata';
import { useUser } from '../../../simple-api-state/use-user';
import { isUtfall } from '../../../types/utfall';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const UtfallResultat = () => {
  const { data: user } = useUser();
  const id = useSaksdataId();
  const [saksdata] = useSaksdata();
  const [setUtfallResultat] = useSetUtfallMutation();
  const canEdit = useCanEdit();
  const utfall = useKodeverkValue('utfall');
  const validationError = useValidationError('utfallId');

  if (typeof saksdata === 'undefined' || typeof utfall === 'undefined' || typeof user === 'undefined') {
    return null;
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const utfallId = isUtfall(target.value) ? target.value : null;
    setUtfallResultat({ id, utfallId, saksbehandlerIdent: user.ident });
  };

  const options = utfall.map(({ id: utfallId, navn }) => (
    <option key={utfallId} value={utfallId}>
      {navn}
    </option>
  ));

  return (
    <StyledItem>
      <Select
        feil={validationError}
        label="Utfall/resultat:"
        onChange={onChange}
        disabled={!canEdit}
        bredde="m"
        value={saksdata.utfallId ?? ''}
        data-testid="utfall-resultat-select"
      >
        <EmptyOption show={saksdata.utfallId === null} />
        {options}
      </Select>
    </StyledItem>
  );
};
