import {
  KLAGEFORBEREDELSEN_HELP_TEXTS,
  KLAGEFORBEREDELSEN_LABELS,
  KlageforberedelsenBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';

export const KLAGEFORBEREDELSEN_TEXTS = {
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter]: {
    color: ColorToken.Accent400,
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter],
    helpText: KLAGEFORBEREDELSEN_HELP_TEXTS[KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter],
  },
  [KlageforberedelsenBoolean.klageforberedelsenOversittetKlagefristIkkeKommentert]: {
    color: ColorToken.Accent500,
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenOversittetKlagefristIkkeKommentert],
  },
  [KlageforberedelsenBoolean.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt]: {
    color: ColorToken.Accent600,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenBoolean.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt
      ],
  },
  [KlageforberedelsenBoolean.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]:
    {
      color: ColorToken.Accent700,
      label:
        KLAGEFORBEREDELSEN_LABELS[
          KlageforberedelsenBoolean
            .klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar
        ],
      helpText:
        KLAGEFORBEREDELSEN_HELP_TEXTS[
          KlageforberedelsenBoolean
            .klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar
        ],
    },
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema]: {
    color: ColorToken.Accent800,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema
      ],
  },
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]: {
    color: ColorToken.Accent900,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker
      ],
    helpText:
      KLAGEFORBEREDELSEN_HELP_TEXTS[
        KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker
      ],
  },
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen]: {
    color: ColorToken.Accent1000,
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen],
    helpText:
      KLAGEFORBEREDELSEN_HELP_TEXTS[KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen],
  },
};

export const SAKENS_DOKUMENTER_TEXTS = {
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]:
    {
      color: ColorToken.Accent500,
      label:
        KLAGEFORBEREDELSEN_LABELS[
          KlageforberedelsenBoolean
            .klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert
        ],
      helpText:
        KLAGEFORBEREDELSEN_HELP_TEXTS[
          KlageforberedelsenBoolean
            .klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert
        ],
    },
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn]: {
    color: ColorToken.Accent600,
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn
      ],
    helpText:
      KLAGEFORBEREDELSEN_HELP_TEXTS[
        KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterJournalfoerteDokumenterFeilNavn
      ],
  },
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe]: {
    color: ColorToken.Accent700,

    label:
      KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe],
    helpText:
      KLAGEFORBEREDELSEN_HELP_TEXTS[KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterManglerFysiskSaksmappe],
  },
};

type SakensDokumenterTextsKeys = keyof typeof SAKENS_DOKUMENTER_TEXTS;

export const SAKENS_DOKUMENTER_REASONS = Object.keys(SAKENS_DOKUMENTER_TEXTS).filter(
  (key): key is SakensDokumenterTextsKeys => key in SAKENS_DOKUMENTER_TEXTS,
);

export const UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS = {
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger]:
    {
      color: ColorToken.Accent500,

      label:
        KLAGEFORBEREDELSEN_LABELS[
          KlageforberedelsenBoolean
            .klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger
        ],
    },
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger]:
    {
      color: ColorToken.Accent600,

      label:
        KLAGEFORBEREDELSEN_LABELS[
          KlageforberedelsenBoolean
            .klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger
        ],
    },
};

type UtredningenUnderKlageforberedelsenTextsKeys = keyof typeof UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS;

export const UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_REASONS = Object.keys(
  UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS,
).filter(
  (key): key is UtredningenUnderKlageforberedelsenTextsKeys => key in UTREDNINGEN_UNDER_KLAGEFORBEREDELSEN_TEXTS,
);
