import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import styled from 'styled-components';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useFieldName } from '../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { RadioValg } from '../../../types/radio';
import { Reason, Reasons } from './reasons';
import { utredningenReasons } from './reasons-labels';
import { FormSection, RadioButtonsRow, SubHeader } from './styled-components';

export const Utredningen = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('utredningenRadioValg');
  const header = useFieldName('utredningenRadioValg');

  if (typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const { id, utredningenRadioValg } = kvalitetsvurdering;

  const reasons: Reason[] = utredningenReasons.map((reason) => ({
    ...reason,
    checked: kvalitetsvurdering[reason.id],
  }));

  return (
    <FormSection>
      <StyledHeaderWrapper>
        <SubHeader>{header}</SubHeader>
        <Hjelpetekst>
          Gjelder kvaliteten på utredningen i perioden frem til og med oversendelse til klageinstansen. Er det kommet
          nye opplysninger etter at saken er oversendt klageinstansen, som vedtaksinstansen burde innhentet, skal dette
          også registreres her.
        </Hjelpetekst>
      </StyledHeaderWrapper>
      <RadioGruppe feil={utredningenRadioValg === null ? validationError : undefined}>
        <RadioButtonsRow>
          <Radio
            name="UtredningenBra"
            label="Bra/godt nok"
            onChange={() => updateKvalitetsvurdering({ id, utredningenRadioValg: RadioValg.BRA })}
            checked={utredningenRadioValg === RadioValg.BRA}
            disabled={!canEdit}
          />
          <Radio
            name="UtredningenMangelfullt"
            label="Mangelfullt"
            onChange={() => updateKvalitetsvurdering({ id, utredningenRadioValg: RadioValg.MANGELFULLT })}
            checked={utredningenRadioValg === RadioValg.MANGELFULLT}
            disabled={!canEdit}
          />
        </RadioButtonsRow>
      </RadioGruppe>
      <Reasons
        error={validationError}
        show={utredningenRadioValg === RadioValg.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
      />
    </FormSection>
  );
};

const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
