import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IKlageenhet, IKodeverkSimpleValue, IKodeverkValue, IYtelse } from '@app/types/kodeverk';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { SakstypeEnum } from '@app/types/sakstype';
import { SimpleApiState, State, useSimpleApiState } from './simple-api-state';

export const API_PREFIX = '/api/klage-kodeverk-api/kodeverk';

interface AllLovKilderToRegistreringshjemmel extends IKodeverkSimpleValue {
  registreringshjemler: IKodeverkSimpleValue[];
}

interface IHjemmelNameWithLovkilde {
  lovkilde: IKodeverkValue;
  hjemmelnavn: string;
}

export type RegistreringshjemlerMap = Record<string, IHjemmelNameWithLovkilde>;

const registreringshjemlerMap = new SimpleApiState<RegistreringshjemlerMap>(`${API_PREFIX}/registreringshjemlermap`);
const lovkildeToRegistreringshjemler = new SimpleApiState<AllLovKilderToRegistreringshjemmel[]>(
  `${API_PREFIX}/lovkildetoregistreringshjemler`,
);
const ytelserV1 = new SimpleApiState<IYtelse[]>(`${API_PREFIX}/ytelser/v1`);
const ytelserV2 = new SimpleApiState<IYtelse[]>(`${API_PREFIX}/ytelser/v2`);
const klageenheter = new SimpleApiState<IKlageenhet[]>(`${API_PREFIX}/klageenheter`);
const enheter = new SimpleApiState<IKodeverkSimpleValue[]>(`${API_PREFIX}/enheter`);
const sakstyper = new SimpleApiState<IKodeverkSimpleValue<SakstypeEnum>[]>(`${API_PREFIX}/sakstyper`);
const vedtaksenheter = new SimpleApiState<IKodeverkSimpleValue[]>(`${API_PREFIX}/vedtaksenheter`);

export const useYtelser = (version: KvalitetsvurderingVersion | typeof skipToken = skipToken) =>
  useSimpleApiState(version === 1 ? ytelserV1 : ytelserV2);
export const useLovkildeToRegistreringshjemler = () => useSimpleApiState(lovkildeToRegistreringshjemler);
export const useRegistreringshjemlerMap = () => useSimpleApiState(registreringshjemlerMap);
export const useKlageenheter = () => useSimpleApiState(klageenheter);
export const useEnheter = () => useSimpleApiState(enheter);

export const useVedtaksenheter = () => useSimpleApiState(vedtaksenheter);

export const useSakstyper = (): State<IKodeverkSimpleValue<SakstypeEnum>[]> => {
  const state = useSimpleApiState(sakstyper);

  if (typeof state.data === 'undefined') {
    return state;
  }

  return {
    ...state,
    data: state.data.filter((sakstype) => sakstype.id !== SakstypeEnum.ANKE_I_TRYGDERETTEN),
  };
};
