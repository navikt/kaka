import {
  ANNET_TEXTS,
  AUTOMATISK_VEDTAK_TEXTS,
  BRUK_AV_RAADGIVENDE_LEGE_TEXTS,
  IKKE_KONKRET_BEGRUNNELSE_TEXTS,
  KLAGEFORBEREDELSEN_TEXTS,
  KVALITETSVURDERING_TEXTS,
  KvalitetsskjemaText,
  SAKENS_DOKUMENTER_TEXTS,
  UTREDNINGEN_TEXTS,
  VEDTAKET_HJEMLER_LIST_TEXTS,
  VEDTAKET_TEXTS,
} from './texts';
import { IKvalitetsvurdering, MainReason } from './v2';

type KlageforberedelsenTextsKeys = keyof typeof KLAGEFORBEREDELSEN_TEXTS;
type UtredningenTextsKeys = keyof typeof UTREDNINGEN_TEXTS;
export type VedtaketTextsKeys = keyof typeof VEDTAKET_TEXTS;
type BrukAvRaadgivendeLegeTextsKeys = keyof typeof BRUK_AV_RAADGIVENDE_LEGE_TEXTS;
type SakensDokumenterTextsKeys = keyof typeof SAKENS_DOKUMENTER_TEXTS;
type IkkeKonkretBegrunnelseTextsKeys = keyof typeof IKKE_KONKRET_BEGRUNNELSE_TEXTS;
export type VedtaketHjemlerListTextsKeys = keyof typeof VEDTAKET_HJEMLER_LIST_TEXTS;

export const MAIN_REASON_IDS: Readonly<MainReason[]> = Object.freeze([
  MainReason.Klageforberedelsen,
  MainReason.Utredningen,
  MainReason.Vedtaket,
  MainReason.BrukAvRaadgivendeLege,
]);

export const KVALITETSVURDERING_V2_TEXTS: Record<keyof IKvalitetsvurdering, KvalitetsskjemaText> = {
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

export const SAKENS_DOKUMENTER_REASONS = Object.keys(SAKENS_DOKUMENTER_TEXTS).filter(
  (key): key is SakensDokumenterTextsKeys => key in SAKENS_DOKUMENTER_TEXTS,
);

export const IKKE_KONKRET_BEGRUNNELSE_REASONS = Object.keys(IKKE_KONKRET_BEGRUNNELSE_TEXTS).filter(
  (key): key is IkkeKonkretBegrunnelseTextsKeys => key in IKKE_KONKRET_BEGRUNNELSE_TEXTS,
);

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
