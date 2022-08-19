import { IKodeverk } from '../types/kodeverk';
import { SimpleApiState, useSimpleApiState } from './simple-api-state';

const kodeverkApi = new SimpleApiState<IKodeverk>(`/api/klage-kodeverk-api/kodeverk`);

export const useKodeverk = () => useSimpleApiState(kodeverkApi);
