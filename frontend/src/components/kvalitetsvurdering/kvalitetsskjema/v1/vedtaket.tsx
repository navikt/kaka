import { Heading, Radio, RadioGroup } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { useKvalitetsvurdering } from '../../../../hooks/use-kvalitetsvurdering';
import { useValidationError } from '../../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../../redux-api/kvalitetsvurdering/v1';
import { Radiovalg } from '../../../../types/kvalitetsvurdering/radio';
import { Reasons } from './reasons';
import { vedtaketReasons } from './reasons-labels';
import { RadioButtonsRow } from './styled-components';
import { Reason } from './types';
import { useKvalitetsvurderingV1FieldName } from './use-field-name';

export const Vedtaket = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const canEdit = useCanEdit();
  const validationError = useValidationError('vedtaketRadioValg');
  const header = useKvalitetsvurderingV1FieldName('vedtaketRadioValg');

  if (typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const { id, vedtaketRadioValg } = kvalitetsvurdering;

  const reasons: Reason[] = vedtaketReasons.map((reason) => ({
    ...reason,
    checked: kvalitetsvurdering[reason.id],
  }));

  const error = vedtaketRadioValg === null ? validationError : undefined;
  const onChange = (value: Radiovalg) => updateKvalitetsvurdering({ id, vedtaketRadioValg: value });

  return (
    <section>
      <Heading size="small">{header}</Heading>
      <RadioGroup
        legend={header}
        hideLegend
        error={error}
        value={vedtaketRadioValg}
        onChange={onChange}
        id="vedtaketRadioValg"
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
        show={vedtaketRadioValg === Radiovalg.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
      />
    </section>
  );
};
