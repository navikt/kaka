import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useFieldName } from '../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { RadioValg } from '../../../types/radio';
import { Reason, Reasons } from './reasons';
import { vedtaketReasons } from './reasons-labels';
import { FormSection, RadioButtonsRow, SubHeader } from './styled-components';

export const Vedtaket = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('vedtaketRadioValg');
  const header = useFieldName('vedtaketRadioValg');

  if (typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const { id, vedtaketRadioValg } = kvalitetsvurdering;

  const reasons: Reason[] = vedtaketReasons.map((reason) => ({
    ...reason,
    checked: kvalitetsvurdering[reason.id],
  }));

  return (
    <FormSection>
      <SubHeader>{header}</SubHeader>
      <RadioGruppe feil={vedtaketRadioValg === null ? validationError : undefined}>
        <RadioButtonsRow>
          <Radio
            name="VedtaketBra"
            label="Bra/godt nok"
            onChange={() => updateKvalitetsvurdering({ id, vedtaketRadioValg: RadioValg.BRA })}
            checked={vedtaketRadioValg === RadioValg.BRA}
            disabled={!canEdit}
          />
          <Radio
            name="VedtaketMangelfullt"
            label="Mangelfullt"
            onChange={() => updateKvalitetsvurdering({ id, vedtaketRadioValg: RadioValg.MANGELFULLT })}
            checked={vedtaketRadioValg === RadioValg.MANGELFULLT}
            disabled={!canEdit}
          />
        </RadioButtonsRow>
      </RadioGruppe>
      <Reasons
        error={validationError}
        show={vedtaketRadioValg === RadioValg.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
      />
    </FormSection>
  );
};
