import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useGetUserDataQuery } from '../../../redux-api/metadata';
import { useSetSakstypeMutation } from '../../../redux-api/saksdata';
import { SakstypeEnum } from '../../../types/sakstype';
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

  const setSakstype = (sakstypeId: SakstypeEnum) => {
    updateSakstype({ id: saksdata.id, sakstypeId, saksbehandlerIdent: user.ident });
  };

  return (
    <StyledItem>
      <RadioGruppe legend="Sakstype" feil={validationError}>
        {sakstyper.map(({ id, navn }) => (
          <Radio
            id={id}
            key={id}
            name={id}
            label={navn}
            disabled={!canEdit}
            checked={saksdata.sakstypeId === id}
            onChange={() => setSakstype(id)}
          />
        ))}
      </RadioGruppe>
    </StyledItem>
  );
};
