import { Radio, RadioGroup } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetSakstypeMutation } from '@app/redux-api/saksdata';
import { useSakstyper } from '@app/simple-api-state/use-kodeverk';
import { useUser } from '@app/simple-api-state/use-user';
import { SakstypeEnum } from '@app/types/sakstype';

export const Sakstype = () => {
  const user = useUser();
  const { data: saksdata } = useSaksdata();
  const [updateSakstype] = useSetSakstypeMutation();
  const { data: sakstyper = [] } = useSakstyper();
  const canEdit = useCanEdit();
  const validationError = useValidationError('sakstypeId');

  if (typeof saksdata === 'undefined' || sakstyper.length === 0) {
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
