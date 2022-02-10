import { Radio } from 'nav-frontend-skjema';
import React from 'react';
import { useCanEdit } from '../../../hooks/use-can-edit';
import { useFieldName } from '../../../hooks/use-field-name';
import { useKvalitetsvurdering } from '../../../hooks/use-kvalitetsvurdering';
import { useValidationError } from '../../../hooks/use-validation-error';
import { useUpdateKvalitetsvurderingMutation } from '../../../redux-api/kvalitetsvurdering';
import { RadioValgExtended } from '../../../types/radio';
import { Reason, Reasons } from './reasons';
import { brukAvRaadgivendeLegeReasons } from './reasons-labels';
import { FormSection, RadioButtonsColumn, SubHeader } from './styled-components';

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

  return (
    <FormSection>
      <SubHeader>{header}</SubHeader>
      <RadioButtonsColumn feil={brukAvRaadgivendeLegeRadioValg === null ? validationError : undefined}>
        <Radio
          name="BrukAvRaadgivendeLegeIkkeAktuelt"
          label="Ikke aktuelt for saken"
          onChange={() =>
            updateKvalitetsvurdering({ id, brukAvRaadgivendeLegeRadioValg: RadioValgExtended.IKKE_AKTUELT })
          }
          checked={brukAvRaadgivendeLegeRadioValg === RadioValgExtended.IKKE_AKTUELT}
          disabled={!canEdit}
        />
        <Radio
          name="BrukAvRaadgivendeLegeBra"
          label="Bra/godt nok"
          onChange={() => updateKvalitetsvurdering({ id, brukAvRaadgivendeLegeRadioValg: RadioValgExtended.BRA })}
          checked={brukAvRaadgivendeLegeRadioValg === RadioValgExtended.BRA}
          disabled={!canEdit}
        />
        <Radio
          name="BrukAvRaadgivendeLegeMangelfullt"
          label="Mangelfullt"
          onChange={() =>
            updateKvalitetsvurdering({ id, brukAvRaadgivendeLegeRadioValg: RadioValgExtended.MANGELFULLT })
          }
          checked={brukAvRaadgivendeLegeRadioValg === RadioValgExtended.MANGELFULLT}
          disabled={!canEdit}
        />
      </RadioButtonsColumn>
      <Reasons
        error={validationError}
        show={brukAvRaadgivendeLegeRadioValg === RadioValgExtended.MANGELFULLT}
        legendText="Hva er mangelfullt?"
        reasons={reasons}
      />
    </FormSection>
  );
};
