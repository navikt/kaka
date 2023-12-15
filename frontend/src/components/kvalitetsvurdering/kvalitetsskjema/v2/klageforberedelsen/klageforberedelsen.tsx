import { Radio } from '@navikt/ds-react';
import React from 'react';
import { MAIN_REASON_HELPTEXTS, MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import {
  HEADER,
  KLAGEFORBEREDELSEN_LABELS,
  KlageforberedelsenErrorFields,
  KlageforberedelsenFields,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { Radiovalg } from '@app/types/kvalitetsvurdering/radio';
import { SakstypeEnum } from '@app/types/sakstype';
import { Checkboxes } from '../common/checkboxes';
import { HeadingWithHelpText } from '../common/heading-with-helptext';
import { RadioButtonsRow, StyledRadioGroup } from '../common/styled-components';
import { CheckboxParams, TypeEnum } from '../common/types';
import { useKvalitetsvurderingV2 } from '../common/use-kvalitetsvurdering-v2';
import { useValidationError } from '../common/use-validation-error';

export const Klageforberedelsen = () => {
  const { isLoading, kvalitetsvurdering, saksdata, update } = useKvalitetsvurderingV2();

  const canEdit = useCanEdit();
  const validationError = useValidationError(MainReason.Klageforberedelsen);

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
  {
    field: KlageforberedelsenFields.klageforberedelsenSakensDokumenter,
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenFields.klageforberedelsenSakensDokumenter],
    type: TypeEnum.CHECKBOX,
    helpText:
      'Dokumentene er ikke fullstendige; f.eks. feil eller mangelfull journalføring av relevante opplysninger i klagebehandlingen.',
    groupErrorField: KlageforberedelsenErrorFields.klageforberedelsenSakensDokumenterGroup,
    childList: [
      {
        field:
          KlageforberedelsenFields.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert,
        label:
          KLAGEFORBEREDELSEN_LABELS[
            KlageforberedelsenFields
              .klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert
          ],
        type: TypeEnum.CHECKBOX,
        helpText:
          'F.eks. notater, klager, referat eller andre opplysninger fra Arena,  Pesys, Infotrygd, A-inntekt, Modia, eller digital aktivitetsplan.',
      },
      {
        field: KlageforberedelsenFields.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn,
        label:
          KLAGEFORBEREDELSEN_LABELS[
            KlageforberedelsenFields.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn
          ],
        type: TypeEnum.CHECKBOX,
        helpText: 'F.eks. står det «fritekstbrev» i stedet for «vedtak», eller «samtale» i stedet for «klage».',
      },
      {
        field: KlageforberedelsenFields.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe,
        label:
          KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenFields.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe],
        type: TypeEnum.CHECKBOX,
        helpText: 'Gjelder kun i saker det er relevant/nødvendig.',
      },
    ],
  },
  {
    field: KlageforberedelsenFields.klageforberedelsenOversittetKlagefristIkkeKommentert,
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenFields.klageforberedelsenOversittetKlagefristIkkeKommentert],
    type: TypeEnum.CHECKBOX,
  },
  {
    field: KlageforberedelsenFields.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenFields.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt
      ],
    type: TypeEnum.CHECKBOX,
  },
  {
    field:
      KlageforberedelsenFields.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenFields
          .klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar
      ],
    type: TypeEnum.CHECKBOX,
    helpText:
      'F.eks. er vilkår eller tema i oversendelsesbrevet vurdert feil, det er henvist til feil hjemler eller begrunnelsen er vanskelig å forstå.',
  },
  {
    field: KlageforberedelsenFields.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenFields.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema
      ],
    type: TypeEnum.CHECKBOX,
  },
  {
    field: KlageforberedelsenFields.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenFields.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker
      ],
    type: TypeEnum.CHECKBOX,
    helpText: 'F.eks. er oversendelsesbrevet ikke sendt til fullmektig i saken.',
  },
  {
    field: KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsen,
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsen],
    groupErrorField: KlageforberedelsenErrorFields.klageforberedelsenUtredningenUnderKlageforberedelsenGroup,
    type: TypeEnum.CHECKBOX,
    helpText:
      'Gjelder kvaliteten på utredningen under klageforberedelsen (fra vedtak ble fattet til saken ble oversendt klageinstansen). Gjelder kvaliteten på utredningen av opplysninger som NAV ikke har tilgang til. Dersom utredningen var mangelfull før vedtak ble fattet og dette ikke ble reparert under klageforberedelsen, huker du av for mangelfull utredning både her og under Utredningen før vedtak.',
    childList: [
      {
        field:
          KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger,
        label:
          KLAGEFORBEREDELSEN_LABELS[
            KlageforberedelsenFields
              .klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger
          ],
        type: TypeEnum.CHECKBOX,
        childList: [
          {
            field:
              KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst,
            label:
              KLAGEFORBEREDELSEN_LABELS[
                KlageforberedelsenFields
                  .klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysningerFritekst
              ],
            type: TypeEnum.TEXTAREA,
            helpText:
              'Det du skriver her er kun for klageinstansens interne bruk og blir ikke synlig for vedtaksinstansen. Husk å skrive kort / med stikkord. Ikke skriv personopplysninger eller detaljer om saken.',
            description:
              'Det du skriver her er kun synlig for klageinstansen og ikke for vedtaksinstansen. Husk å ikke skrive personopplysninger.',
          },
        ],
      },
      {
        field:
          KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger,
        label:
          KLAGEFORBEREDELSEN_LABELS[
            KlageforberedelsenFields
              .klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger
          ],
        type: TypeEnum.CHECKBOX,
        childList: [
          {
            field:
              KlageforberedelsenFields.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst,
            label:
              KLAGEFORBEREDELSEN_LABELS[
                KlageforberedelsenFields
                  .klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysningerFritekst
              ],
            type: TypeEnum.TEXTAREA,
            helpText:
              'Det du skriver her er kun for klageinstansens interne bruk og blir ikke synlig for vedtaksinstansen. Husk å skrive kort / med stikkord. Ikke skriv personopplysninger eller detaljer om saken.',
            description:
              'Det du skriver her er kun synlig for klageinstansen og ikke for vedtaksinstansen. Husk å ikke skrive personopplysninger.',
          },
        ],
      },
    ],
  },
];
