import { Radio } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '../../../../hooks/use-can-edit';
import { Radiovalg } from '../../../../types/kvalitetsvurdering/radio';
import { KLAGEFORBEREDELSEN_REASONS, getChildrenEntries } from '../../../../types/kvalitetsvurdering/texts/structures';
import { KLAGEFORBEREDELSEN_TEXTS, KVALITETSVURDERING_TEXTS } from '../../../../types/kvalitetsvurdering/texts/texts';
import { MainReason } from '../../../../types/kvalitetsvurdering/v2';
import { SakstypeEnum } from '../../../../types/sakstype';
import { Checkboxes } from './common/checkboxes';
import { HeadingWithHelpText } from './common/heading-with-helptext';
import { RadioButtonsRow, StyledRadioGroup } from './common/styled-components';
import { ICheckboxParams } from './common/types';
import { useKvalitetsvurderingV2FieldName } from './common/use-field-name';
import { useKvalitetsvurderingV2 } from './common/use-kvalitetsvurdering-v2';
import { useValidationError } from './common/use-validation-error';

export const Klageforberedelsen = () => {
  const { isLoading, kvalitetsvurdering, saksdata, update } = useKvalitetsvurderingV2();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Klageforberedelsen);
  const header = useKvalitetsvurderingV2FieldName(MainReason.Klageforberedelsen);

  if (
    isLoading ||
    saksdata.sakstypeId === SakstypeEnum.ANKE ||
    saksdata.sakstypeId === SakstypeEnum.ANKE_I_TRYGDERETTEN
  ) {
    return null;
  }

  const { klageforberedelsen } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ klageforberedelsen: value });

  return (
    <section>
      <HeadingWithHelpText helpText={KVALITETSVURDERING_TEXTS[MainReason.Klageforberedelsen].helpText}>
        {header}
      </HeadingWithHelpText>
      <StyledRadioGroup
        legend={header}
        hideLegend
        value={klageforberedelsen}
        error={validationError}
        onChange={onChange}
        id="klageforberedelsen"
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
        update={update}
        checkboxes={KLAGEFORBEREDELSEN_CHECKBOXES}
        show={klageforberedelsen === Radiovalg.MANGELFULLT}
        groupErrorField="klageforberedelsenGroup"
        label="Hva er mangelfullt?"
      />
    </section>
  );
};

const KLAGEFORBEREDELSEN_CHECKBOXES: ICheckboxParams[] = KLAGEFORBEREDELSEN_REASONS.map((field) => ({
  field,
  ...KLAGEFORBEREDELSEN_TEXTS[field],
  checkboxes: getChildrenEntries(KLAGEFORBEREDELSEN_TEXTS[field]).map(([f, value]) => ({
    field: f,
    ...value,
  })),
}));
