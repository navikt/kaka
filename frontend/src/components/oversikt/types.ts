import { IKodeverkSimpleValue } from '../../types/kodeverk';

export enum QueryParams {
  ENHETER = 'enheter',
  TYPES = 'types',
  YTELSER = 'ytelser',
  YEAR = 'year',
}

export interface FilterType extends IKodeverkSimpleValue {
  count: number;
}
