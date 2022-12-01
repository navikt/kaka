import { Radio, RadioGroup } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValueDefault } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetSakstypeMutation } from '../../../redux-api/saksdata';
import { useUser } from '../../../simple-api-state/use-user';
import { SakstypeEnum } from '../../../types/sakstype';

export const Sakstype = () => {
  const { data: user } = useUser();
  const { data: saksdata } = useSaksdata();
  const [updateSakstype] = useSetSakstypeMutation();
  const sakstyper = useKodeverkValueDefault('sakstyper');
  const canEdit = useCanEdit();
  const validationError = useValidationError('sakstypeId');

  if (typeof saksdata === 'undefined' || sakstyper.length === 0 || typeof user === 'undefined') {
    return null;
  }

  const setSakstype = (sakstypeId: SakstypeEnum) =>
    updateSakstype({ id: saksdata.id, sakstypeId, saksbehandlerIdent: user.ident });

  return (
    <RadioGroup id="sakstypeId" legend="Sakstype" error={validationError} size="medium" value={saksdata.sakstypeId}>
      <HorizontalRadios>
        {sakstyper.map(({ id, navn }) => (
          <Radio
            id={id}
            key={id}
            name={id}
            value={id}
            disabled={!canEdit}
            onChange={() => setSakstype(id)}
            size="medium"
          >
            {navn}
          </Radio>
        ))}
      </HorizontalRadios>
    </RadioGroup>
  );
};

const HorizontalRadios = styled.div`
  display: flex;
  column-gap: 16px;
`;
