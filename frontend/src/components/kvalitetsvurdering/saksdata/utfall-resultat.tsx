import { Select } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetUtfallMutation } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { useUtfallFromSakstype } from '@app/simple-api-state/use-utfall';
import { isUtfall } from '@app/types/utfall';
import { EmptyOption } from './empty-option';

export const UtfallResultat = () => {
  const { data: user } = useUser();
  const id = useSaksdataId();
  const { data: saksdata } = useSaksdata();
  const [setUtfallResultat] = useSetUtfallMutation();
  const canEdit = useCanEdit();
  const [utfall] = useUtfallFromSakstype(saksdata?.sakstypeId);
  const validationError = useValidationError('utfallId');

  if (typeof saksdata === 'undefined' || typeof user === 'undefined') {
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
    <Select
      error={validationError}
      label="Utfall/resultat"
      onChange={onChange}
      disabled={!canEdit}
      value={saksdata.utfallId ?? ''}
      data-testid="utfallId"
      size="medium"
      id="utfallId"
    >
      <EmptyOption show={saksdata.utfallId === null} />
      {options}
    </Select>
  );
};
