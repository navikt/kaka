import { Heading, Radio, RadioGroup } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useFieldName } from '../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { RadiovalgExtended } from '../../../types/radio';
import { Reasons } from './reasons';
import { brukAvRaadgivendeLegeReasons } from './reasons-labels';
import { Reason } from './types';

export const BrukAvRaadgivendeLege = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const validationError = useValidationError('brukAvRaadgivendeLegeRadioValg');
  const canEdit = useCanEdit();
  const header = useFieldName('brukAvRaadgivendeLegeRadioValg');

  if (typeof kvalitetsvurdering === 'undefined') {
    return null;
  }

  const { id, brukAvRaadgivendeLegeRadioValg } = kvalitetsvurdering;

  const reasons: Reason[] = brukAvRaadgivendeLegeReasons.map((reason) => ({
    ...reason,
    checked: kvalitetsvurdering[reason.id],
  }));

  const onChange = (value: RadiovalgExtended) =>
    updateKvalitetsvurdering({ id, brukAvRaadgivendeLegeRadioValg: value });
  const error = brukAvRaadgivendeLegeRadioValg === null ? validationError : undefined;

  return (
    <section>
      <Heading size="small">{header}</Heading>
      <RadioGroup
        legend={header}
        hideLegend
        value={brukAvRaadgivendeLegeRadioValg}
        error={error}
        onChange={onChange}
        id="brukAvRaadgivendeLegeRadioValg"
      >
        <Radio value={RadiovalgExtended.IKKE_AKTUELT} disabled={!canEdit}>
          Ikke aktuelt for saken
        </Radio>
        <Radio value={RadiovalgExtended.BRA} disabled={!canEdit}>
          Bra/godt nok
        </Radio>
        <Radio value={RadiovalgExtended.MANGELFULLT} disabled={!canEdit}>
          Mangelfullt
        </Radio>
      </RadioGroup>

      <Reasons
        error={validationError}
        show={brukAvRaadgivendeLegeRadioValg === RadiovalgExtended.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
      />
    </section>
  );
};
