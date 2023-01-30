import { Radio } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { Radiovalg } from '../../../../types/kvalitetsvurdering/radio';
import { UTREDNINGEN_REASONS, getChildrenEntries } from '../../../../types/kvalitetsvurdering/texts/structures';
import { KVALITETSVURDERING_TEXTS, UTREDNINGEN_TEXTS } from '../../../../types/kvalitetsvurdering/texts/texts';
import { MainReason } from '../../../../types/kvalitetsvurdering/v2';
import { Checkboxes } from './common/checkboxes';
import { HeadingWithHelpText } from './common/heading-with-helptext';
import { RadioButtonsRow, StyledRadioGroup } from './common/styled-components';
import { ICheckboxParams } from './common/types';
import { useKvalitetsvurderingV2FieldName } from './common/use-field-name';
import { useKvalitetsvurderingV2 } from './common/use-kvalitetsvurdering-v2';
import { useValidationError } from './common/use-validation-error';

export const Utredningen = () => {
  const { isLoading, kvalitetsvurdering, update } = useKvalitetsvurderingV2();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Utredningen);
  const header = useKvalitetsvurderingV2FieldName(MainReason.Utredningen);

  if (isLoading) {
    return null;
  }

  const { utredningen } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ utredningen: value });

  return (
    <section>
      <HeadingWithHelpText helpText={KVALITETSVURDERING_TEXTS[MainReason.Utredningen].helpText}>
        {header}
      </HeadingWithHelpText>
      <StyledRadioGroup
        legend={header}
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

      <Checkboxes
        kvalitetsvurdering={kvalitetsvurdering}
        checkboxes={UTREDNINGEN_CHECKBOXES}
        update={update}
        show={utredningen === Radiovalg.MANGELFULLT}
        errorField="utredningenGroup"
        label="Hva er mangelfullt?"
      />
    </section>
  );
};

const UTREDNINGEN_CHECKBOXES: ICheckboxParams[] = UTREDNINGEN_REASONS.map((field) => ({
  field,
  ...UTREDNINGEN_TEXTS[field],
  checkboxes: getChildrenEntries(UTREDNINGEN_TEXTS[field]).map(([f, value]) => ({
    field: f,
    ...value,
  })),
}));
