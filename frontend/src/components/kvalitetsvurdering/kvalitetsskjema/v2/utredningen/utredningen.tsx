import { MAIN_REASON_HELPTEXTS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { getCheckbox } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/helpers';
import {
  HEADER,
  UtredningenBoolean,
  UtredningenErrorFields,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { Radio } from '@navikt/ds-react';
import { RadioButtonsRow, StyledRadioGroup } from '../../common/styled-components';
import { Checkboxes } from '../common/checkboxes';
import { HeadingWithHelpText } from '../common/heading-with-helptext';
import type { CheckboxParams } from '../common/types';
import { useKvalitetsvurderingV2 } from '../common/use-kvalitetsvurdering-v2';
import { useValidationError } from '../common/use-validation-error';

export const Utredningen = () => {
  const { isLoading, kvalitetsvurdering, update } = useKvalitetsvurderingV2();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Utredningen);

  if (isLoading) {
    return null;
  }

  const { utredningen } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ utredningen: value });

  return (
    <section>
      <HeadingWithHelpText helpText={MAIN_REASON_HELPTEXTS[MainReason.Utredningen]}>{HEADER}</HeadingWithHelpText>
      <StyledRadioGroup
        legend={HEADER}
        hideLegend
        value={utredningen}
        error={validationError}
        onChange={onChange}
        id="utredningen"
      >
        <RadioButtonsRow>
          <Radio value={Radiovalg.BRA} disabled={!canEdit}>
            Bra/godt nok
          </Radio>
          <Radio value={Radiovalg.MANGELFULLT} disabled={!canEdit}>
            Mangelfullt
          </Radio>
        </RadioButtonsRow>
      </StyledRadioGroup>

      {utredningen === Radiovalg.MANGELFULLT ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          childList={CHECKBOXES}
          update={update}
          groupErrorField={UtredningenErrorFields.utredningenGroup}
          label="Hva er mangelfullt?"
        />
      ) : null}
    </section>
  );
};

const CHECKBOXES: CheckboxParams[] = [
  getCheckbox({ field: UtredningenBoolean.utredningenAvMedisinskeForhold }),
  getCheckbox({ field: UtredningenBoolean.utredningenAvInntektsforhold }),
  getCheckbox({ field: UtredningenBoolean.utredningenAvArbeidsaktivitet }),
  getCheckbox({ field: UtredningenBoolean.utredningenAvEoesUtenlandsproblematikk }),
  getCheckbox({ field: UtredningenBoolean.utredningenAvSivilstandBoforhold }),
  getCheckbox({ field: UtredningenBoolean.utredningenAvAndreAktuelleForholdISaken }),
];
