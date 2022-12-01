import { HelpText, Radio, RadioGroup } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { useFieldName } from '../../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../../hooks/use-kvalitetsvurdering';
import { useValidationError } from '../../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../../redux-api/kvalitetsvurdering/v1';
import { Radiovalg } from '../../../../types/kvalitetsvurdering/radio';
import { Reasons } from './reasons';
import { utredningenReasons } from './reasons-labels';
import { RadioButtonsRow, StyledHeading } from './styled-components';
import { Reason } from './types';

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

  const error = utredningenRadioValg === null ? validationError : undefined;
  const onChange = (value: Radiovalg) => updateKvalitetsvurdering({ id, utredningenRadioValg: value });

  return (
    <section>
      <StyledHeading size="small">
        {header}
        <HelpText placement="right">
          Gjelder kvaliteten på utredningen i perioden frem til og med oversendelse til klageinstansen. Er det kommet
          nye opplysninger etter at saken er oversendt klageinstansen, som vedtaksinstansen burde innhentet, skal dette
          også registreres her.
        </HelpText>
      </StyledHeading>

      <RadioGroup
        legend={header}
        hideLegend
        value={utredningenRadioValg}
        error={error}
        onChange={onChange}
        id="utredningenRadioValg"
      >
        <RadioButtonsRow>
          <Radio value={Radiovalg.BRA} disabled={!canEdit}>
            Bra / godt nok
          </Radio>
          <Radio value={Radiovalg.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt
          </Radio>
        </RadioButtonsRow>
      </RadioGroup>
      <Reasons
        error={validationError}
        show={utredningenRadioValg === Radiovalg.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
      />
    </section>
  );
};
