import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useSetSakstypeMutation } from '../../../redux-api/saksdata';
import { isSakstype } from '../../../types/sakstype';
import { EmptyOption } from './empty-option';
import { StyledItem } from './styled-components';

export const Sakstype = () => {
  const { data: user } = useGetUserDataQuery();
  const [saksdata] = useSaksdata();
  const [updateSakstype] = useSetSakstypeMutation();
  const sakstyper = useKodeverkValue('sakstyper');
  const canEdit = useCanEdit();
  const validationError = useValidationError('sakstypeId');

  if (typeof saksdata === 'undefined' || typeof sakstyper === 'undefined' || typeof user === 'undefined') {
    return null;
  }

  const onChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const sakstypeId = isSakstype(target.value) ? target.value : null;
    updateSakstype({ id: saksdata.id, sakstypeId, saksbehandlerIdent: user.ident });
  };

  return (
    <StyledItem>
      <Select
        label="Sakstype"
        onChange={onChange}
        bredde="m"
        disabled={!canEdit}
        feil={validationError}
        data-testid="sakstype-select"
        value={saksdata.sakstypeId ?? ''}
      >
        <EmptyOption show={saksdata.sakstypeId === null} />
        {sakstyper.map(({ id, navn }) => (
          <option key={id} value={id}>
            {navn}
          </option>
        ))}
      </Select>
    </StyledItem>
  );
};
