import { IKodeverkSimpleValue } from '../../types/kodeverk';

export enum QueryParams {
  ENHETER = 'enheter',
  TYPES = 'types',
  YTELSER = 'ytelser',
  UTFALL = 'utfall',
  YEAR = 'year',
  FROM_DATE = 'fromDate',
  TO_DATE = 'toDate',
  HJEMLER = 'hjemler',
  BEHANDLINGSTID = 'bht',
  KVALITETSVURDERING = 'kvt',
}

export interface FilterType extends IKodeverkSimpleValue {
  count: number;
}
