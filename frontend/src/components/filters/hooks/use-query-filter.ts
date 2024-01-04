import { useSearchParams } from 'react-router-dom';
import {
  Vedtaksinstansgruppe,
  isVedtaksinstansgruppe,
} from '@app/components/statistikk/total/vedtaksinstansgruppe-filter';
import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import { QueryParams } from '../../filters/filter-query-params';
import { TilbakekrevingEnum } from '../types';

export const useQueryFilter = (filter: QueryParams): string | null => {
  const [searchParams] = useSearchParams();

  return searchParams.get(filter);
};

const EMPTY_ARRAY: string[] = [];

export const useQueryFilters = (filter: QueryParams): string[] => useQueryFilter(filter)?.split(',') ?? EMPTY_ARRAY;

export const useVedtaksinstansgruppeQueryFilter = (): Vedtaksinstansgruppe[] => {
  const values = useQueryFilters(QueryParams.VEDTAKSINSTANSGRUPPER);

  const result: Vedtaksinstansgruppe[] = [];

  for (const value of values) {
    const parsed = parseInt(value, 10);

    if (!Number.isNaN(parsed) && isVedtaksinstansgruppe(parsed)) {
      result.push(parsed);
    }
  }

  return result;
};

export const useFromDateQueryFilter = (defaultDate: string): string => {
  const queryValue = useQueryFilter(QueryParams.FROM_DATE);

  if (queryValue === null || queryValue.length === 0) {
    return defaultDate;
  }

  return queryValue;
};

export const useToDateQueryFilter = (defaultDate: string): string => {
  const queryValue = useQueryFilter(QueryParams.TO_DATE);

  if (queryValue === null || queryValue.length === 0) {
    return defaultDate;
  }

  return queryValue;
};

export const useFromMonthQueryFilter = (defaultDate: string): string => {
  const queryValue = useQueryFilter(QueryParams.FROM_MONTH);

  if (queryValue === null || queryValue.length === 0) {
    return defaultDate;
  }

  return queryValue;
};

export const useToMonthQueryFilter = (defaultDate: string): string => {
  const queryValue = useQueryFilter(QueryParams.TO_MONTH);

  if (queryValue === null || queryValue.length === 0) {
    return defaultDate;
  }

  return queryValue;
};

export const useTilbakekrevingQueryFilter = (defaultTilbakekreving: TilbakekrevingEnum): TilbakekrevingEnum => {
  const queryValue = useQueryFilter(QueryParams.TILBAKEKREVING);

  if (queryValue === null || queryValue.length === 0) {
    return defaultTilbakekreving;
  }

  if (!isTilbakekrevingEnum(queryValue)) {
    return defaultTilbakekreving;
  }

  return queryValue;
};

export const useVersionQueryFilter = (defaultVersion?: KvalitetsvurderingVersion): KvalitetsvurderingVersion => {
  const queryValue = useQueryFilter(QueryParams.VERSION);

  if (queryValue === null || queryValue.length === 0) {
    return defaultVersion ?? KvalitetsvurderingVersion.V2;
  }

  const version = parseInt(queryValue, 10);

  if (!isKvalitetsvurderingVersion(version)) {
    return defaultVersion ?? KvalitetsvurderingVersion.V2;
  }

  return version;
};

const isTilbakekrevingEnum = (value: string): value is TilbakekrevingEnum =>
  Object.values(TilbakekrevingEnum).includes(value as TilbakekrevingEnum);

const KVALITETSVURDERING_VERSION_VALUES = Object.values(KvalitetsvurderingVersion);

const isKvalitetsvurderingVersion = (value: number): value is KvalitetsvurderingVersion =>
  KVALITETSVURDERING_VERSION_VALUES.some((v) => v === value);
