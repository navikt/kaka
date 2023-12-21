import { IKodeverkSimpleValue } from './../../../../types/kodeverk';

export const REST = 'REST';
export const AVERAGE = 'AVERAGE';
export const GLOBAL_AVERAGE = 'GLOBAL_AVERAGE';

export const REST_LABEL = 'Resten';
export const AVERAGE_LABEL = 'Gjennomsnitt';
export const GLOBAL_AVERAGE_LABEL = 'Globalt gjennomsnitt';

export const DEFAULT_OPTIONS: IKodeverkSimpleValue[] = [
  { id: REST, navn: REST_LABEL },
  { id: GLOBAL_AVERAGE, navn: GLOBAL_AVERAGE_LABEL },
  { id: AVERAGE, navn: AVERAGE_LABEL },
];
