import { Alert, Checkbox, Radio } from '@navikt/ds-react';
import React from 'react';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { VEDTAKET_REASONS, getChildrenEntries } from '@app/types/kvalitetsvurdering/texts/structures';
import { AUTOMATISK_VEDTAK_TEXTS, VEDTAKET_TEXTS } from '@app/types/kvalitetsvurdering/texts/texts';
import { MainReason } from '@app/types/kvalitetsvurdering/v2';
import { Checkboxes } from './common/checkboxes';
import { ContainerWithHelpText } from './common/container-with-helptext';
import { RadioButtonsRow, StyledHeading, StyledRadioGroup } from './common/styled-components';
import { ICheckboxParams } from './common/types';
import { useKvalitetsvurderingV2FieldName } from './common/use-field-name';
import { useKvalitetsvurderingV2 } from './common/use-kvalitetsvurdering-v2';
import { useValidationError } from './common/use-validation-error';

const { label, helpText } = AUTOMATISK_VEDTAK_TEXTS.vedtaketAutomatiskVedtak;

export const Vedtaket = () => {
  const { isLoading, kvalitetsvurdering, update } = useKvalitetsvurderingV2();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Vedtaket);
  const header = useKvalitetsvurderingV2FieldName(MainReason.Vedtaket);

  if (isLoading) {
    return null;
  }

  const { vedtaket, vedtaketAutomatiskVedtak: vedtakAutomatiskVedtak } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ vedtaket: value });

  return (
    <section>
      <StyledHeading size="small">{header}</StyledHeading>

      {vedtakAutomatiskVedtak === true ? <Alert variant="info">{helpText}</Alert> : null}
      <ContainerWithHelpText helpText={helpText}>
        <Checkbox
          value="vedtakAutomatiskVedtak"
          checked={vedtakAutomatiskVedtak}
          onChange={({ target }) => update({ vedtaketAutomatiskVedtak: target.checked })}
          disabled={!canEdit}
        >
          {label}
        </Checkbox>
      </ContainerWithHelpText>

      <StyledRadioGroup
        legend={header}
        hideLegend
        value={vedtaket}
        error={validationError}
        onChange={onChange}
        id="vedtaket"
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
        checkboxes={CHECKBOXES}
        show={vedtaket === Radiovalg.MANGELFULLT}
        groupErrorField="vedtaketGroup"
        label="Hva er mangelfullt?"
      />
    </section>
  );
};

const CHECKBOXES: ICheckboxParams[] = VEDTAKET_REASONS.map((field) => ({
  field,
  ...VEDTAKET_TEXTS[field],
  checkboxes: getChildrenEntries(VEDTAKET_TEXTS[field]).map(([f, value]) => ({
    field: f,
    ...value,
  })),
}));
