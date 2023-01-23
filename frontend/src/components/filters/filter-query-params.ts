export enum ComparableQueryParams {
  ENHETER = 'enheter',
  KLAGEENHETER = 'klageenheter',
  VEDTAKSINSTANSGRUPPER = 'vedtaksinstansgrupper',
  YTELSER = 'ytelser',
  UTFALL = 'utfall',
  DATE_INTERVALS = 'dateIntervals',
  HJEMLER = 'hjemler',
}

enum UncomparableQueryParams {
  TYPES = 'types',
  BEHANDLINGSTID = 'bht',
  KVALITETSVURDERING = 'kvt',
  MANGELFULLT = 'mangelfullt',
  KOMMENTARER = 'kommentarer',
  SAKSBEHANDLERE = 'saksbehandlere',
  TILBAKEKREVING = 'tilbakekreving',
  COMPARISON_PROP = 'comparisonProp',
  COMPARISON_VALUES = 'comparisonValues',
  VERSION = 'version',
  FROM_MONTH = 'fromMonth',
  TO_MONTH = 'toMonth',
  FROM_DATE = 'fromDate',
  TO_DATE = 'toDate',
  DATASET_INDEX = 'dataset',
}

export const QueryParams = {
  ...ComparableQueryParams,
  ...UncomparableQueryParams,
};

export type QueryParams = ComparableQueryParams | UncomparableQueryParams;
