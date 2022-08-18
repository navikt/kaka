import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useKodeverkValue } from '../../../hooks/use-kodeverk-value';
import { useSaksdata } from '../../../hooks/use-saksdata';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useSetSakstypeMutation } from '../../../redux-api/saksdata';
import { useUser } from '../../../simple-api-state/use-user';
import { SakstypeEnum } from '../../../types/sakstype';

export const Sakstype = () => {
  const { data: user } = useUser();
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
    <StyledRadioGruppe legend="Sakstype" feil={validationError}>
      <StyledRadios>
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
      </StyledRadios>
    </StyledRadioGruppe>
  );
};

const StyledRadioGruppe = styled(RadioGruppe)`
  &&& .skjemagruppe__legend {
    margin-bottom: 0.5em;
  }
`;

const StyledRadios = styled.div`
  display: flex;
  justify-content: space-between;
  width: 210px;
`;
