import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useKodeverk } from '../simple-api-state/use-kodeverk';
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
  const { data, isLoading } = useKodeverk();

  if (key === skipToken || isLoading || typeof data === 'undefined') {
    return undefined;
  }

  return data[key];
};

const useKodeverkYtelse = (ytelseId: string | typeof skipToken = skipToken): IYtelse | undefined =>
  useKodeverkValueDefault('ytelser').find(({ id }) => id === ytelseId);

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
  const utfall = useKodeverkValueDefault('utfall');

  return utfall.find(({ id }) => id === utfallId);
};

export const useKodeverkSakstype = (
  sakstypeId: string | typeof skipToken = skipToken
): IKodeverkSimpleValue<SakstypeEnum> | undefined => {
  const sakstyper = useKodeverkValueDefault('sakstyper');

  return sakstyper.find(({ id }) => id === sakstypeId);
};

export const useEnheterForYtelse = (ytelseId: string | typeof skipToken = skipToken): IKodeverkSimpleValue[] =>
  useKodeverkYtelse(ytelseId)?.enheter ?? [];

export const useKlageenheterForYtelse = (ytelseId: string | typeof skipToken = skipToken): IKodeverkSimpleValue[] =>
  useKodeverkYtelse(ytelseId)?.klageenheter ?? [];

const useKodeverkKlageenhet = (klageenhetId: string | typeof skipToken = skipToken): IKlageenhet | undefined => {
  const klageenheter = useKodeverkValueDefault('klageenheter');

  return klageenheter.find(({ id }) => id === klageenhetId);
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
  const ytelser = useKodeverkValueDefault('ytelser');

  if (enhetId === skipToken) {
    return ytelser;
  }

  return ytelser.filter(({ enheter }) => enheter.some(({ id }) => id === enhetId));
};

export const useYtelserForKlageenhet = (enhetId: string | typeof skipToken = skipToken): IYtelse[] => {
  const ytelser = useKodeverkValueDefault('ytelser');

  if (enhetId === skipToken) {
    return ytelser;
  }

  return ytelser.filter(({ klageenheter }) => klageenheter.some(({ id }) => id === enhetId));
};
