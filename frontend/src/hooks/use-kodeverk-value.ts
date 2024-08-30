import type { State } from '@app/simple-api-state/simple-api-state';
import { useKlageenheter, useSakstyper, useYtelser } from '@app/simple-api-state/use-kodeverk';
import { useSortedUtfall } from '@app/simple-api-state/use-utfall';
import type { IKlageenhet, IKodeverkSimpleValue, ILovKildeToRegistreringshjemmel, IYtelse } from '@app/types/kodeverk';
import type { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { SakstypeEnum } from '@app/types/sakstype';
import type { UtfallEnum } from '@app/types/utfall';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSaksdata } from './use-saksdata';

type YtelseParams = typeof skipToken | { ytelseId: string; version: KvalitetsvurderingVersion };

export const useYtelseParams = (): YtelseParams => {
  const { data: saksdata } = useSaksdata();

  if (typeof saksdata === 'undefined' || saksdata.ytelseId === null) {
    return skipToken;
  }

  return {
    ytelseId: saksdata.ytelseId,
    version: saksdata.kvalitetsvurderingReference.version,
  };
};

const useKodeverkYtelse = (params: YtelseParams): State<IYtelse> => {
  const skip = params === skipToken;
  const { data, ...rest } = useYtelser(skip ? skipToken : params.version);

  if (skip) {
    return { ...rest, data: undefined, isLoading: false };
  }

  const { ytelseId } = params;

  if (typeof data === 'undefined') {
    return { ...rest, data: undefined };
  }

  return { ...rest, data: data.find(({ id }) => id === ytelseId) };
};

export const useFullYtelseNameFromId = (params: YtelseParams): string => {
  const { data: ytelse, isLoading } = useKodeverkYtelse(params);

  if (isLoading) {
    return 'Laster...';
  }

  if (params === skipToken || typeof ytelse === 'undefined') {
    return 'Mangler';
  }

  return ytelse?.navn ?? params.ytelseId;
};

export const useKodeverkUtfall = (
  utfallId: string | typeof skipToken = skipToken,
): IKodeverkSimpleValue<UtfallEnum> | undefined => {
  const { data = [] } = useSortedUtfall();

  return utfallId === skipToken ? undefined : data.find(({ id }) => id === utfallId);
};

export const useKodeverkSakstype = (
  sakstypeId: string | typeof skipToken = skipToken,
): IKodeverkSimpleValue<SakstypeEnum> | undefined => {
  const { data = [] } = useSakstyper();

  return sakstypeId === skipToken ? undefined : data.find(({ id }) => id === sakstypeId);
};

export const useEnheterForYtelse = (params: YtelseParams): IKodeverkSimpleValue[] =>
  useKodeverkYtelse(params).data?.enheter ?? [];

export const useKlageenheterForYtelse = (params: YtelseParams): IKodeverkSimpleValue[] =>
  useKodeverkYtelse(params).data?.klageenheter ?? [];

const useKodeverkKlageenhet = (klageenhetId: string | typeof skipToken = skipToken): IKlageenhet | undefined => {
  const { data = [] } = useKlageenheter();

  return klageenhetId === skipToken ? undefined : data.find(({ id }) => id === klageenhetId);
};

export const useLovkildeToRegistreringshjemmelForYtelse = (params: YtelseParams): ILovKildeToRegistreringshjemmel[] =>
  useKodeverkYtelse(params).data?.lovKildeToRegistreringshjemler ?? [];

export const useSimpleYtelserForKlageenhet = (
  klageenhetId: string | typeof skipToken = skipToken,
): IKodeverkSimpleValue[] => {
  const klageenhet = useKodeverkKlageenhet(klageenhetId);

  if (klageenhetId === skipToken || typeof klageenhet === 'undefined') {
    return [];
  }

  return klageenhet.ytelser;
};

export const useYtelserForVedtaksinstansenhet = (
  enhetId: string | typeof skipToken,
  version: KvalitetsvurderingVersion,
): IYtelse[] => {
  const { data: ytelser = [] } = useYtelser(version);

  if (enhetId === skipToken) {
    return [];
  }

  return ytelser.filter(({ enheter }) => enheter.some(({ id }) => id === enhetId));
};

export const useYtelserForKlageenhet = (
  enhetId: string | typeof skipToken,
  version: KvalitetsvurderingVersion,
): IYtelse[] => {
  const { data: ytelser = [] } = useYtelser(version);

  if (enhetId === skipToken) {
    return [];
  }

  return ytelser.filter(({ klageenheter }) => klageenheter.some(({ id }) => id === enhetId));
};
