import {
  LEGACY_VEDTAKET_HELP_TEXTS,
  LEGACY_VEDTAKET_LABELS,
  LegacyVedtaketBoolean,
  LegacyVedtaketHjemlerList,
  VEDTAKET_HELP_TEXTS,
  VEDTAKET_LABELS,
  VedtaketAllregistreringshjemlerList,
  VedtaketBoolean,
  VedtaketHjemlerListBoolean,
  VedtaketSaksdatahjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/vedtaket/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';

// TODO: Decide color for new fields
export const VEDTAKET_TEXTS = {
  // New in 2024
  [VedtaketHjemlerListBoolean.vedtaketBruktFeilHjemmel]: {
    color: ColorToken.Success300,
    label: VEDTAKET_LABELS[VedtaketHjemlerListBoolean.vedtaketBruktFeilHjemmel],
    helpText: VEDTAKET_HELP_TEXTS[VedtaketHjemlerListBoolean.vedtaketBruktFeilHjemmel],
  },
  // New in 2024
  [VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert]: {
    color: ColorToken.Success400,
    label: VEDTAKET_LABELS[VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert],
    helpText: VEDTAKET_HELP_TEXTS[VedtaketHjemlerListBoolean.vedtaketAlleRelevanteHjemlerErIkkeVurdert],
  },
  // NOT in 2024
  [LegacyVedtaketBoolean.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert]: {
    color: ColorToken.Success200,
    label: LEGACY_VEDTAKET_LABELS[LegacyVedtaketBoolean.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert],
    helpText:
      LEGACY_VEDTAKET_HELP_TEXTS[LegacyVedtaketBoolean.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdert],
    hjemler: LegacyVedtaketHjemlerList.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList,
  },
  [VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil]: {
    color: ColorToken.Success500,
    label: VEDTAKET_LABELS[VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil],
    helpText: VEDTAKET_HELP_TEXTS[VedtaketHjemlerListBoolean.vedtaketLovbestemmelsenTolketFeil],
  },
  [VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet]: {
    color: ColorToken.Success600,
    label: VEDTAKET_LABELS[VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet],
    helpText:
      VEDTAKET_HELP_TEXTS[VedtaketHjemlerListBoolean.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevet],
  },
  [VedtaketBoolean.vedtaketDetErLagtTilGrunnFeilFaktum]: {
    color: ColorToken.Success700,
    label: VEDTAKET_LABELS[VedtaketBoolean.vedtaketDetErLagtTilGrunnFeilFaktum],
    helpText: VEDTAKET_HELP_TEXTS[VedtaketBoolean.vedtaketDetErLagtTilGrunnFeilFaktum],
  },
  [VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse]: {
    color: ColorToken.Success800,
    label: VEDTAKET_LABELS[VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse],
    helpText: VEDTAKET_HELP_TEXTS[VedtaketHjemlerListBoolean.vedtaketFeilKonkretRettsanvendelse],
  },
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelse]: {
    color: ColorToken.Success900,
    label: VEDTAKET_LABELS[VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelse],
    helpText: VEDTAKET_HELP_TEXTS[VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelse],
  },
  [VedtaketBoolean.vedtaketSpraakOgFormidlingErIkkeTydelig]: {
    color: ColorToken.Success1000,
    label: VEDTAKET_LABELS[VedtaketBoolean.vedtaketSpraakOgFormidlingErIkkeTydelig],
    helpText: VEDTAKET_HELP_TEXTS[VedtaketBoolean.vedtaketSpraakOgFormidlingErIkkeTydelig],
  },
};

export const IKKE_KONKRET_BEGRUNNELSE_TEXTS = {
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum]: {
    color: ColorToken.Success500,
    label: VEDTAKET_LABELS[VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremFaktum],
  },
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum]: {
    color: ColorToken.Success600,
    label:
      VEDTAKET_LABELS[
        VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseIkkeGodtNokFremHvordanRettsregelenErAnvendtPaaFaktum
      ],
  },
  [VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst]: {
    color: ColorToken.Success700,
    label: VEDTAKET_LABELS[VedtaketBoolean.vedtaketIkkeKonkretIndividuellBegrunnelseMyeStandardtekst],
  },
};

export type StatisticsVedtaketHjemlerList =
  | VedtaketSaksdatahjemlerList
  | VedtaketAllregistreringshjemlerList
  | LegacyVedtaketHjemlerList;

export type StatisticsVedtaketHjemlerListBoolean = VedtaketHjemlerListBoolean | LegacyVedtaketBoolean;

export const VEDTAKET_HJEMLER_LIST_TEXTS = {
  [VedtaketAllregistreringshjemlerList.vedtaketBruktFeilHjemmelHjemlerList]: {
    label: VEDTAKET_LABELS[VedtaketAllregistreringshjemlerList.vedtaketBruktFeilHjemmelHjemlerList],
  },
  [VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList]: {
    label: VEDTAKET_LABELS[VedtaketSaksdatahjemlerList.vedtaketAlleRelevanteHjemlerErIkkeVurdertHjemlerList],
  },
  [LegacyVedtaketHjemlerList.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList]: {
    label:
      LEGACY_VEDTAKET_LABELS[
        LegacyVedtaketHjemlerList.vedtaketBruktFeilHjemmelEllerAlleRelevanteHjemlerErIkkeVurdertHjemlerList
      ],
  },
  [VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList]: {
    label: VEDTAKET_LABELS[VedtaketSaksdatahjemlerList.vedtaketLovbestemmelsenTolketFeilHjemlerList],
  },
  [VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList]: {
    label:
      VEDTAKET_LABELS[
        VedtaketSaksdatahjemlerList.vedtaketInnholdetIRettsregleneErIkkeTilstrekkeligBeskrevetHjemlerList
      ],
  },
  [VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList]: {
    label: VEDTAKET_LABELS[VedtaketSaksdatahjemlerList.vedtaketFeilKonkretRettsanvendelseHjemlerList],
  },
};

type IkkeKonkretBegrunnelseTextsKeys = keyof typeof IKKE_KONKRET_BEGRUNNELSE_TEXTS;

export const IKKE_KONKRET_BEGRUNNELSE_REASONS = Object.keys(IKKE_KONKRET_BEGRUNNELSE_TEXTS).filter(
  (key): key is IkkeKonkretBegrunnelseTextsKeys => key in IKKE_KONKRET_BEGRUNNELSE_TEXTS,
);
