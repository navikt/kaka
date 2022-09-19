import { IKodeverk } from '../types/kodeverk';
import { SakstypeEnum } from '../types/sakstype';
import { SimpleApiState, State, useSimpleApiState } from './simple-api-state';

const kodeverkApi = new SimpleApiState<IKodeverk>(`/api/klage-kodeverk-api/kodeverk`);

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
