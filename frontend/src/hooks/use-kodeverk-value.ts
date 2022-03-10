import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetKodeverkQuery } from '../redux-api/kodeverk';
import {
  IKlageenhet,
  IKodeverk,
  IKodeverkSimpleValue,
  ILovKildeToRegistreringshjemmel,
  IYtelse,
} from '../types/kodeverk';
import { SakstypeEnum } from '../types/sakstype';
import { UtfallEnum } from '../types/utfall';

export const useKodeverkValueDefault = <K extends keyof IKodeverk>(
  key: K | typeof skipToken = skipToken
): IKodeverk[K] => useKodeverkValue(key) ?? [];

export const useKodeverkValue = <K extends keyof IKodeverk>(
  key: K | typeof skipToken = skipToken
): IKodeverk[K] | undefined => {
  const { data } = useGetKodeverkQuery(key === skipToken ? skipToken : undefined);

  if (key === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data[key];
};

export const useKodeverkYtelser = (skip?: typeof skipToken): IYtelse[] => {
  const data = useKodeverkValue(skip === skipToken ? skipToken : 'ytelser');

  if (skip === skipToken || typeof data === 'undefined') {
    return [];
  }

  return data;
};

export const useKodeverkYtelse = (ytelseId: string | typeof skipToken = skipToken): IYtelse | undefined =>
  useKodeverkYtelser().find(({ id }) => id === ytelseId);

export const useFullYtelseNameFromId = (ytelseId: string | null): string => {
  const ytelse = useKodeverkYtelse(ytelseId ?? skipToken);

  if (typeof ytelse === 'undefined') {
    return 'Mangler';
  }

  return ytelse?.navn ?? ytelseId;
};

export const useKodeverkUtfall = (
  utfallId: string | typeof skipToken = skipToken
): IKodeverkSimpleValue<UtfallEnum> | undefined => {
  const data = useKodeverkValue(utfallId === skipToken ? skipToken : 'utfall');

  if (utfallId === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data.find(({ id }) => id === utfallId);
};

export const useKodeverkSakstype = (
  sakstypeId: string | typeof skipToken = skipToken
): IKodeverkSimpleValue<SakstypeEnum> | undefined => {
  const data = useKodeverkValue(sakstypeId === skipToken ? skipToken : 'sakstyper');

  if (sakstypeId === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data.find(({ id }) => id === sakstypeId);
};

export const useEnheterForYtelse = (ytelseId: string | typeof skipToken = skipToken): IKodeverkSimpleValue[] =>
  useKodeverkYtelse(ytelseId)?.enheter ?? [];

export const useKlageenheterForYtelse = (ytelseId: string | typeof skipToken = skipToken): IKodeverkSimpleValue[] =>
  useKodeverkYtelse(ytelseId)?.klageenheter ?? [];

export const useKodeverkKlageenhet = (klageenhetId: string | typeof skipToken = skipToken): IKlageenhet | undefined => {
  const data = useKodeverkValue(klageenhetId === skipToken ? skipToken : 'klageenheter');

  if (klageenhetId === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data.find(({ id }) => id === klageenhetId);
};

export const useLovkildeToRegistreringshjemmelForYtelse = (
  ytelseId: string | typeof skipToken = skipToken
): ILovKildeToRegistreringshjemmel[] => useKodeverkYtelse(ytelseId)?.lovKildeToRegistreringshjemler ?? [];

export const useSimpleYtelserForKlageenhet = (
  klageenhetId: string | typeof skipToken = skipToken
): IKodeverkSimpleValue[] => {
  const klageenhet = useKodeverkKlageenhet(klageenhetId);

  if (klageenhetId === skipToken || typeof klageenhet === 'undefined') {
    return [];
  }

  return klageenhet.ytelser;
};

export const useYtelserForVedtaksinstansenhet = (enhetId: string | typeof skipToken = skipToken): IYtelse[] => {
  const ytelser = useKodeverkYtelser();

  if (enhetId === skipToken) {
    return ytelser;
  }

  return ytelser.filter(({ enheter }) => enheter.some(({ id }) => id === enhetId));
};

export const useYtelserForKlageenhet = (enhetId: string | typeof skipToken = skipToken): IYtelse[] => {
  const ytelser = useKodeverkYtelser();

  if (enhetId === skipToken) {
    return ytelser;
  }

  return ytelser.filter(({ klageenheter }) => klageenheter.some(({ id }) => id === enhetId));
};
