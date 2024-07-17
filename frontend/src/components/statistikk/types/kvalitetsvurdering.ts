import { NAV_COLORS } from '@app/colors/colors';
import {
  MAIN_REASON_HELPTEXTS,
  MAIN_REASON_LABELS,
  MainReason,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { ANNET_TEXTS } from '@app/components/statistikk/types/annet';
import { AUTOMATISK_VEDTAK_TEXTS } from '@app/components/statistikk/types/automatisk-vedtak';
import { BRUK_AV_RAADGIVENDE_LEGE_TEXTS } from '@app/components/statistikk/types/bruk-av-raadgivende-lege';
import { HelpTextContainer } from '@app/components/statistikk/types/common';
import { KLAGEFORBEREDELSEN_TEXTS, SAKENS_DOKUMENTER_TEXTS } from '@app/components/statistikk/types/klageforberedelsen';
import { UTREDNINGEN_TEXTS } from '@app/components/statistikk/types/utredningen';
import {
  IKKE_KONKRET_BEGRUNNELSE_TEXTS,
  VEDTAKET_HJEMLER_LIST_TEXTS,
  VEDTAKET_TEXTS,
} from '@app/components/statistikk/types/vedtaket';

export const KVALITETSVURDERING_TEXTS = {
  [MainReason.Klageforberedelsen]: {
    color: NAV_COLORS.blue[400],
    label: MAIN_REASON_LABELS[MainReason.Klageforberedelsen],
    helpText: MAIN_REASON_HELPTEXTS[MainReason.Klageforberedelsen] ?? undefined,
  },
  [MainReason.Utredningen]: {
    color: NAV_COLORS.orange[400],
    label: MAIN_REASON_LABELS[MainReason.Utredningen],
    helpText: MAIN_REASON_HELPTEXTS[MainReason.Utredningen] ?? undefined,
  },
  [MainReason.Vedtaket]: {
    color: NAV_COLORS.green[400],
    label: MAIN_REASON_LABELS[MainReason.Vedtaket],
    helpText: MAIN_REASON_HELPTEXTS[MainReason.Vedtaket] ?? undefined,
  },
  [MainReason.BrukAvRaadgivendeLege]: {
    color: NAV_COLORS.red[400],
    label: MAIN_REASON_LABELS[MainReason.BrukAvRaadgivendeLege],
    helpText: MAIN_REASON_HELPTEXTS[MainReason.BrukAvRaadgivendeLege] ?? undefined,
  },
};

export const KVALITETSVURDERING_HELP_TEXTS: HelpTextContainer[] = [
  {
    key: 'KVALITETSVURDERING_TEXTS',
    texts: KVALITETSVURDERING_TEXTS,
  },
];

type KlageforberedelsenTextsKeys = keyof typeof KLAGEFORBEREDELSEN_TEXTS;
type UtredningenTextsKeys = keyof typeof UTREDNINGEN_TEXTS;
type VedtaketTextsKeys = keyof typeof VEDTAKET_TEXTS;
type BrukAvRaadgivendeLegeTextsKeys = keyof typeof BRUK_AV_RAADGIVENDE_LEGE_TEXTS;

const KLAGEFORBEREDELSEN_REASONS = Object.keys(KLAGEFORBEREDELSEN_TEXTS).filter(
  (key): key is KlageforberedelsenTextsKeys => key in KLAGEFORBEREDELSEN_TEXTS,
);

const UTREDNINGEN_REASONS = Object.keys(UTREDNINGEN_TEXTS).filter(
  (key): key is UtredningenTextsKeys => key in UTREDNINGEN_TEXTS,
);

const VEDTAKET_REASONS = Object.keys(VEDTAKET_TEXTS).filter((key): key is VedtaketTextsKeys => key in VEDTAKET_TEXTS);

const BRUK_AV_RAADGIVENDE_LEGE_REASONS = Object.keys(BRUK_AV_RAADGIVENDE_LEGE_TEXTS).filter(
  (key): key is BrukAvRaadgivendeLegeTextsKeys => key in BRUK_AV_RAADGIVENDE_LEGE_TEXTS,
);

export const REASON_TO_SUBREASONS: {
  [MainReason.Klageforberedelsen]: typeof KLAGEFORBEREDELSEN_REASONS;
  [MainReason.Utredningen]: typeof UTREDNINGEN_REASONS;
  [MainReason.Vedtaket]: typeof VEDTAKET_REASONS;
  [MainReason.BrukAvRaadgivendeLege]: typeof BRUK_AV_RAADGIVENDE_LEGE_REASONS;
} = {
  [MainReason.Klageforberedelsen]: KLAGEFORBEREDELSEN_REASONS,
  [MainReason.Utredningen]: UTREDNINGEN_REASONS,
  [MainReason.Vedtaket]: VEDTAKET_REASONS,
  [MainReason.BrukAvRaadgivendeLege]: BRUK_AV_RAADGIVENDE_LEGE_REASONS,
};

export const MAIN_REASON_IDS: readonly MainReason[] = Object.freeze([
  MainReason.Klageforberedelsen,
  MainReason.Utredningen,
  MainReason.Vedtaket,
  MainReason.BrukAvRaadgivendeLege,
]);

export const KVALITETSVURDERING_V2_TEXTS = {
  ...KVALITETSVURDERING_TEXTS,
  ...KLAGEFORBEREDELSEN_TEXTS,
  ...SAKENS_DOKUMENTER_TEXTS,
  ...UTREDNINGEN_TEXTS,
  ...VEDTAKET_TEXTS,
  ...VEDTAKET_HJEMLER_LIST_TEXTS,
  ...AUTOMATISK_VEDTAK_TEXTS,
  ...IKKE_KONKRET_BEGRUNNELSE_TEXTS,
  ...BRUK_AV_RAADGIVENDE_LEGE_TEXTS,
  ...ANNET_TEXTS,
};
