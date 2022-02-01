import { IStatisticVurdering } from '../../types/statistics';

export enum QueryParams {
  ENHETER = 'enheter',
  KLAGEENHETER = 'klageenheter',
  TYPES = 'types',
  YTELSER = 'ytelser',
  UTFALL = 'utfall',
  YEAR = 'year',
  FROM_MONTH = 'fromMonth',
  TO_MONTH = 'toMonth',
  FROM_DATE = 'fromDate',
  TO_DATE = 'toDate',
  HJEMLER = 'hjemler',
  BEHANDLINGSTID = 'bht',
  KVALITETSVURDERING = 'kvt',
  SAKSBEHANDLERE = 'saksbehandlere',
}

export interface FilterType {
  id: string;
  label: string;
  count?: number;
}

export interface StatisticsProps {
  stats: IStatisticVurdering[];
}
