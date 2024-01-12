import { NAV_COLORS } from '@app/colors/colors';
import {
  KLAGEFORBEREDELSEN_HELP_TEXTS,
  KLAGEFORBEREDELSEN_LABELS,
  KlageforberedelsenBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/klageforberedelsen/data';

export const KLAGEFORBEREDELSEN_TEXTS = {
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter]: {
    color: NAV_COLORS.blue[100],
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter],
    helpText: KLAGEFORBEREDELSEN_HELP_TEXTS[KlageforberedelsenBoolean.klageforberedelsenSakensDokumenter],
  },
  [KlageforberedelsenBoolean.klageforberedelsenOversittetKlagefristIkkeKommentert]: {
    color: NAV_COLORS.blue[200],
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenOversittetKlagefristIkkeKommentert],
  },
  [KlageforberedelsenBoolean.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt]: {
    color: NAV_COLORS.blue[300],
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenBoolean.klageforberedelsenKlagersRelevanteAnfoerslerIkkeTilstrekkeligKommentertImoetegaatt
      ],
  },
  [KlageforberedelsenBoolean.klageforberedelsenFeilVedBegrunnelsenForHvorforAvslagOpprettholdesKlagerIkkeOppfyllerVilkaar]:
    {
      color: NAV_COLORS.blue[400],
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
    color: NAV_COLORS.blue[500],
    label:
      KLAGEFORBEREDELSEN_LABELS[
        KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevetsInnholdErIkkeISamsvarMedSakensTema
      ],
  },
  [KlageforberedelsenBoolean.klageforberedelsenOversendelsesbrevIkkeSendtKopiTilPartenEllerFeilMottaker]: {
    color: NAV_COLORS.blue[600],
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
    color: NAV_COLORS.blue[700],
    label: KLAGEFORBEREDELSEN_LABELS[KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen],
    helpText:
      KLAGEFORBEREDELSEN_HELP_TEXTS[KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsen],
  },
};

export const SAKENS_DOKUMENTER_TEXTS = {
  [KlageforberedelsenBoolean.klageforberedelsenSakensDokumenterRelevanteOpplysningerFraAndreFagsystemerErIkkeJournalfoert]:
    {
      color: NAV_COLORS.blue[300],
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
    color: NAV_COLORS.blue[400],
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
    color: NAV_COLORS.blue[500],

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
      color: NAV_COLORS.blue[300],

      label:
        KLAGEFORBEREDELSEN_LABELS[
          KlageforberedelsenBoolean
            .klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarBedtUnderinstansenOmAaInnhenteNyeOpplysninger
        ],
    },
  [KlageforberedelsenBoolean.klageforberedelsenUtredningenUnderKlageforberedelsenKlageinstansenHarSelvInnhentetNyeOpplysninger]:
    {
      color: NAV_COLORS.blue[400],

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
