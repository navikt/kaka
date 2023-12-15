import { Radio } from '@navikt/ds-react';
import React from 'react';
import { MAIN_REASON_HELPTEXTS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  HEADER,
  UTREDNINGEN_LABELS,
  UtredningenErrorFields,
  UtredningenFields,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/utredningen/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { Checkboxes } from '../common/checkboxes';
import { HeadingWithHelpText } from '../common/heading-with-helptext';
import { RadioButtonsRow, StyledRadioGroup } from '../common/styled-components';
import { CheckboxParams, TypeEnum } from '../common/types';
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
  {
    field: UtredningenFields.utredningenAvMedisinskeForhold,
    label: UTREDNINGEN_LABELS[UtredningenFields.utredningenAvMedisinskeForhold],
    type: TypeEnum.CHECKBOX,
    helpText:
      'F.eks. er det ikke innhentet uttalelse fra en behandler eller rapport fra rehabiliteringsopphold. Dersom opplysninger som er innhentet ikke er gode nok, og NAV burde bedt om presiseringer eller mer utdypede opplysninger, registreres det her.',
  },
  {
    field: UtredningenFields.utredningenAvInntektsforhold,
    label: UTREDNINGEN_LABELS[UtredningenFields.utredningenAvInntektsforhold],
    type: TypeEnum.CHECKBOX,
    helpText: 'F.eks. er det ikke innhentet lønnslipper eller kontoopplysninger.',
  },
  {
    field: UtredningenFields.utredningenAvArbeidsaktivitet,
    label: UTREDNINGEN_LABELS[UtredningenFields.utredningenAvArbeidsaktivitet],
    type: TypeEnum.CHECKBOX,
    helpText: 'F.eks. er det ikke innhentet arbeidskontrakt, timelister, eller rapporter fra tiltak.',
  },
  {
    field: UtredningenFields.utredningenAvEoesUtenlandsproblematikk,
    label: UTREDNINGEN_LABELS[UtredningenFields.utredningenAvEoesUtenlandsproblematikk],
    type: TypeEnum.CHECKBOX,
    helpText:
      'F.eks. er det ikke er innhentet opplysninger om trygdetid i andre land. Er EØS-/utenlandsproblematikk ikke fanget opp i det hele tatt, registreres også det her.',
  },
  {
    field: UtredningenFields.utredningenAvSivilstandBoforhold,
    label: UTREDNINGEN_LABELS[UtredningenFields.utredningenAvSivilstandBoforhold],
    type: TypeEnum.CHECKBOX,
    helpText: 'Du registrerer også her om boforhold/sivilstand er av betydning, men ikke avklart.',
  },
  {
    field: UtredningenFields.utredningenAvAndreAktuelleForholdISaken,
    label: UTREDNINGEN_LABELS[UtredningenFields.utredningenAvAndreAktuelleForholdISaken],
    type: TypeEnum.CHECKBOX,
    helpText:
      'Du kan skrive konkret hvilke feil ved utredningen av andre aktuelle forhold det gjelder i fritekstfeltet nederst.',
  },
];
