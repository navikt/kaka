import { Heading, Radio, RadioGroup } from '@navikt/ds-react';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useKvalitetsvurdering } from '@app/hooks/use-kvalitetsvurdering';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '@app/redux-api/kvalitetsvurdering/v1';
import { RadiovalgExtended } from '@app/types/kvalitetsvurdering/radio';
import { Reasons } from './reasons';
import { brukAvRaadgivendeLegeReasons } from './reasons-labels';
import { Reason } from './types';
import { useKvalitetsvurderingV1FieldName } from './use-field-name';

export const BrukAvRaadgivendeLege = () => {
  const [kvalitetsvurdering] = useKvalitetsvurdering();
  const [updateKvalitetsvurdering] = useUpdateKvalitetsvurderingMutation();
  const validationError = useValidationError('brukAvRaadgivendeLegeRadioValg');
  const canEdit = useCanEdit();
  const header = useKvalitetsvurderingV1FieldName('brukAvRaadgivendeLegeRadioValg');

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
