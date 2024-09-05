import { MAIN_REASON_HELPTEXTS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { getCheckbox, getTextInput } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/helpers';
import {
  HEADER,
  KlageforberedelsenBoolean,
  KlageforberedelsenErrorFields,
  KlageforberedelsenTextInput,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { SakstypeEnum } from '@app/types/sakstype';
import { Radio } from '@navikt/ds-react';
import { Checkboxes } from '../common/checkboxes';
import { HeadingWithHelpText } from '../common/heading-with-helptext';
import { RadioButtonsRow, StyledRadioGroup } from '../common/styled-components';
import type { CheckboxParams } from '../common/types';
import { useKvalitetsvurderingV2 } from '../common/use-kvalitetsvurdering-v2';
import { useValidationError } from '../common/use-validation-error';

export const Klageforberedelsen = () => {
  const { isLoading, kvalitetsvurdering, saksdata, update } = useKvalitetsvurderingV2();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Klageforberedelsen);

  if (isLoading || saksdata.sakstypeId !== SakstypeEnum.KLAGE) {
    return null;
  }

  const { klageforberedelsen } = kvalitetsvurdering;

  const onChange = (value: Radiovalg) => update({ klageforberedelsen: value });

  return (
    <section>
      <HeadingWithHelpText helpText={MAIN_REASON_HELPTEXTS[MainReason.Klageforberedelsen]}>
        {HEADER}
      </HeadingWithHelpText>
      <StyledRadioGroup
        legend={HEADER}
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

      {klageforberedelsen === Radiovalg.MANGELFULLT ? (
        <Checkboxes
          kvalitetsvurdering={kvalitetsvurdering}
          update={update}
          childList={CHECKBOXES}
          groupErrorField={KlageforberedelsenErrorFields.klageforberedelsenGroup}
          label="Hva er mangelfullt?"
        />
      ) : null}
    </section>
  );
};

const CHECKBOXES: CheckboxParams[] = [
  getCheckbox({
    field: KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter,
    childList: [
      getCheckbox({
        field:
          KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert,
      }),
      getCheckbox({
        field: KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn,
      }),
      getCheckbox({ field: KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe }),
    ],
    groupErrorField: KlageforberedelsenErrorFields.klageforberedelsenSakensDokumenterGroup,
  }),
  getCheckbox({ field: KlageforberedelsenBoolean.klageforberedelsenOversittetKlagefristIkkeKommentert }),
  getCheckbox({
    field: KlageforberedelsenBoolean.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt,
  }),
  getCheckbox({
    field:
      KlageforberedelsenBoolean.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar,
  }),
  getCheckbox({
    field: KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema,
  }),
  getCheckbox({
    field: KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker,
  }),

  getCheckbox({
    field: KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen,
    childList: [
      getCheckbox({
        field:
          KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger,
        childList: [
          getTextInput(
            KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst,
          ),
        ],
      }),
      getCheckbox({
        field:
          KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger,
        childList: [
          getTextInput(
            KlageforberedelsenTextInput.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst,
          ),
        ],
      }),
    ],
    groupErrorField: KlageforberedelsenErrorFields.klageforberedelsenUtredningenUnderKlageforberedelsenGroup,
  }),
];
