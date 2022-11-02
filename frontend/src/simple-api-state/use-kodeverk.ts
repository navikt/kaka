import { IKodeverk, IKodeverkSimpleValue, IKodeverkValue } from '../types/kodeverk';
import { SakstypeEnum } from '../types/sakstype';
import { SimpleApiState, State, useSimpleApiState } from './simple-api-state';

const API_PREFIX = '/api/klage-kodeverk-api/kodeverk';

interface AllLovKilderToRegistreringshjemmel extends IKodeverkSimpleValue {
  registreringshjemler: IKodeverkSimpleValue[];
}

interface IHjemmelNameWithLovkilde {
  lovkilde: IKodeverkValue;
  hjemmelnavn: string;
}

type RegistreringshjemlerMap = Record<string, IHjemmelNameWithLovkilde>;

const kodeverkApi = new SimpleApiState<IKodeverk>(`${API_PREFIX}`);
const registreringshjemlerMap = new SimpleApiState<RegistreringshjemlerMap>(`${API_PREFIX}/registreringshjemlermap`);
const lovkildeToRegistreringshjemler = new SimpleApiState<AllLovKilderToRegistreringshjemmel[]>(
  `${API_PREFIX}/lovkildetoregistreringshjemler`
);

export const useLovkildeToRegistreringshjemler = () => useSimpleApiState(lovkildeToRegistreringshjemler);
export const useRegistreringshjemlerMap = () => useSimpleApiState(registreringshjemlerMap);

export const useKodeverk = (): State<IKodeverk> => {
  const state = useSimpleApiState(kodeverkApi);

  if (typeof state.data === 'undefined') {
    return state;
  }

  return {
    ...state,
    data: {
      ...state.data,
      sakstyper: state.data.sakstyper.filter((sakstype) => sakstype.id !== SakstypeEnum.ANKE_I_TRYGDERETTEN),
    },
  };
};
