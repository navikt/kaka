import {
  MAIN_REASON_HELPTEXTS,
  MAIN_REASON_LABELS,
  MainReason,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import type { BegrunnelsespliktenSaksdataHjemlerLists } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/data';
import type {
  SærregelverketHjemlerFromYtelseList,
  SærregelverketSaksdataHjemlerList,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/data';
import { ColorToken } from '@app/components/statistikk/colors/token-name';
import { ANNET_TEXTS } from '@app/components/statistikk/types/v3/annet';
import {
  BEGRUNNELSESPLIKTEN_HJEMLER_LIST_TEXTS,
  BEGRUNNELSESPLIKTEN_TEXTS,
  FORELEGGELSESPLIKTEN_TEXTS,
  JOURNALFØRINGSPLIKTEN_TEXTS,
  KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS,
  KLART_SPRÅK_TEXTS,
  OMGJØRING_TEXTS,
  SAKSBEHANDLINGSREGLENE_TEXTS,
  UTREDNINGSPLIKTEN_TEXTS,
  VEILEDNINGSPLIKTEN_TEXTS,
} from '@app/components/statistikk/types/v3/saksbehandlingsreglene';
import {
  LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS,
  SÆRREGELVERKET_HJEMLER_LIST_TEXTS,
  SÆRREGELVERKET_TEXTS,
} from '@app/components/statistikk/types/v3/særregelverket';
import { TRYGDEMEDISIN_TEXTS } from '@app/components/statistikk/types/v3/trygdemedisin';

export const KVALITETSVURDERING_TEXTS = {
  [MainReason.Særregelverket]: {
    color: ColorToken.Info500,
    label: MAIN_REASON_LABELS[MainReason.Særregelverket],
    helpText: MAIN_REASON_HELPTEXTS[MainReason.Særregelverket] ?? undefined,
  },
  [MainReason.Saksbehandlingsreglene]: {
    color: ColorToken.Warning500,
    label: MAIN_REASON_LABELS[MainReason.Saksbehandlingsreglene],
    helpText: MAIN_REASON_HELPTEXTS[MainReason.Saksbehandlingsreglene] ?? undefined,
  },
  [MainReason.Trygdemedisin]: {
    color: ColorToken.Danger500,
    label: MAIN_REASON_LABELS[MainReason.Trygdemedisin],
    helpText: MAIN_REASON_HELPTEXTS[MainReason.Trygdemedisin] ?? undefined,
  },
};

type SærregelverketTextsKeys = keyof typeof SÆRREGELVERKET_TEXTS;
type SaksbehandlingsregleneTextsKeys = keyof typeof SAKSBEHANDLINGSREGLENE_TEXTS;
type TrygdemedisinTextsKeys = keyof typeof TRYGDEMEDISIN_TEXTS;

const SÆRREGELVERKET_REASONS = Object.keys(SÆRREGELVERKET_TEXTS).filter(
  (key): key is SærregelverketTextsKeys => key in SÆRREGELVERKET_TEXTS,
);

const SAKSBEHANDLINGSREGLENE_REASONS = Object.keys(SAKSBEHANDLINGSREGLENE_TEXTS).filter(
  (key): key is SaksbehandlingsregleneTextsKeys => key in SAKSBEHANDLINGSREGLENE_TEXTS,
);

const TRYGDEMEDISIN_REASONS = Object.keys(TRYGDEMEDISIN_TEXTS).filter(
  (key): key is TrygdemedisinTextsKeys => key in TRYGDEMEDISIN_TEXTS,
);

export const REASON_TO_SUBREASONS: {
  [MainReason.Særregelverket]: typeof SÆRREGELVERKET_REASONS;
  [MainReason.Saksbehandlingsreglene]: typeof SAKSBEHANDLINGSREGLENE_REASONS;
  [MainReason.Trygdemedisin]: typeof TRYGDEMEDISIN_REASONS;
} = {
  [MainReason.Særregelverket]: SÆRREGELVERKET_REASONS,
  [MainReason.Saksbehandlingsreglene]: SAKSBEHANDLINGSREGLENE_REASONS,
  [MainReason.Trygdemedisin]: TRYGDEMEDISIN_REASONS,
};

export const MAIN_REASON_IDS: readonly MainReason[] = Object.freeze([
  MainReason.Særregelverket,
  MainReason.Saksbehandlingsreglene,
  MainReason.Trygdemedisin,
]);

export type KvalitetsvurderingV3HjemlerList =
  | SærregelverketHjemlerFromYtelseList
  | SærregelverketSaksdataHjemlerList
  | BegrunnelsespliktenSaksdataHjemlerLists;

export const KVALITETSVURDERING_V3_TEXTS = {
  ...KVALITETSVURDERING_TEXTS,

  ...SÆRREGELVERKET_TEXTS,
  ...SAKSBEHANDLINGSREGLENE_TEXTS,
  ...TRYGDEMEDISIN_TEXTS,

  ...LOVEN_ER_TOLKET_ELLER_ANVENDT_FEIL_TEXTS,

  ...VEILEDNINGSPLIKTEN_TEXTS,
  ...UTREDNINGSPLIKTEN_TEXTS,
  ...FORELEGGELSESPLIKTEN_TEXTS,
  ...BEGRUNNELSESPLIKTEN_TEXTS,
  ...KLAGE_OG_KLAGEFORBEREDELSEN_TEXTS,
  ...OMGJØRING_TEXTS,
  ...JOURNALFØRINGSPLIKTEN_TEXTS,
  ...KLART_SPRÅK_TEXTS,

  ...BEGRUNNELSESPLIKTEN_HJEMLER_LIST_TEXTS,
  ...SÆRREGELVERKET_HJEMLER_LIST_TEXTS,

  ...ANNET_TEXTS,
};
