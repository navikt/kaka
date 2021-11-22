import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetKodeverkQuery } from '../redux-api/metadata';
import { IKodeverk, IKodeverkValue, ITema } from '../types/kodeverk';
import { SakstypeEnum } from '../types/sakstype';
import { UtfallEnum } from '../types/utfall';

export const useKodeverkValue = <K extends keyof IKodeverk>(
  key: K | typeof skipToken = skipToken
): IKodeverk[K] | undefined => {
  const { data } = useGetKodeverkQuery(key === skipToken ? skipToken : undefined);

  if (key === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data[key];
};

export const useKodeverkTema = (temaId: string | typeof skipToken = skipToken): ITema | undefined => {
  const data = useKodeverkValue(temaId === skipToken ? skipToken : 'temaer');

  if (temaId === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data.find(({ id }) => id === temaId);
};

export const useKodeverkUtfall = (
  utfallId: string | typeof skipToken = skipToken
): IKodeverkValue<UtfallEnum> | undefined => {
  const data = useKodeverkValue(utfallId === skipToken ? skipToken : 'utfall');

  if (utfallId === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data.find(({ id }) => id === utfallId);
};

export const useKodeverkHjemmel = (hjemmelId: string | typeof skipToken = skipToken): IKodeverkValue | undefined => {
  const data = useKodeverkValue(hjemmelId === skipToken ? skipToken : 'hjemler');

  if (hjemmelId === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data.find(({ id }) => id === hjemmelId);
};

export const useKodeverkSakstype = (
  sakstypeId: string | typeof skipToken = skipToken
): IKodeverkValue<SakstypeEnum> | undefined => {
  const data = useKodeverkValue(sakstypeId === skipToken ? skipToken : 'sakstyper');

  if (sakstypeId === skipToken || typeof data === 'undefined') {
    return undefined;
  }

  return data.find(({ id }) => id === sakstypeId);
};

export const useEnheterForTema = (temaId: string | typeof skipToken = skipToken): IKodeverkValue[] =>
  useKodeverkTema(temaId)?.vedtaksenheter ?? [];

export const useHjemlerForTema = (temaId: string | typeof skipToken = skipToken): IKodeverkValue[] =>
  useKodeverkTema(temaId)?.hjemler ?? [];
