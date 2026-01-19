import {
  isVedtaksinstansgruppe,
  type Vedtaksinstansgruppe,
} from '@app/components/statistikk/total/vedtaksinstansgruppe-filter';
import { KVALITETSVURDERING_LATEST, KvalitetsvurderingVersion } from '@app/types/saksdata';
import { isSakstype, type SakstypeEnum } from '@app/types/sakstype';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../filters/filter-query-params';
import { HjemlerModeFilter, TilbakekrevingEnum } from '../types';

export const useQueryFilter = (filter: QueryParams): string | null => {
  const [searchParams] = useSearchParams();

  return searchParams.get(filter);
};

const EMPTY_ARRAY: string[] = [];

export const useQueryFilters = (filter: QueryParams): string[] => useQueryFilter(filter)?.split(',') ?? EMPTY_ARRAY;

export const useSakstypeFilter = (): SakstypeEnum[] => {
  const values = useQueryFilters(QueryParams.TYPES);

  return values.filter(isSakstype);
};

export const useVedtaksinstansgruppeQueryFilter = (): Vedtaksinstansgruppe[] => {
  const values = useQueryFilters(QueryParams.VEDTAKSINSTANSGRUPPER);

  const result: Vedtaksinstansgruppe[] = [];

  for (const value of values) {
    const parsed = Number.parseInt(value, 10);

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

export const useHjemlerModeFilter = (defaultMode: HjemlerModeFilter): HjemlerModeFilter => {
  const queryValue = useQueryFilter(QueryParams.HJEMLER_MODE);

  if (queryValue === null || queryValue.length === 0) {
    return defaultMode;
  }

  if (!isHjemlerModeFilter(queryValue)) {
    return defaultMode;
  }

  return queryValue;
};

export const useVersionQueryFilter = (defaultVersion?: KvalitetsvurderingVersion): KvalitetsvurderingVersion => {
  const queryValue = useQueryFilter(QueryParams.VERSION);

  if (queryValue === null || queryValue.length === 0) {
    return defaultVersion ?? KVALITETSVURDERING_LATEST;
  }

  const version = Number.parseInt(queryValue, 10);

  if (!isKvalitetsvurderingVersion(version)) {
    return defaultVersion ?? KVALITETSVURDERING_LATEST;
  }

  return version;
};

const isTilbakekrevingEnum = (value: string): value is TilbakekrevingEnum =>
  Object.values(TilbakekrevingEnum).includes(value as TilbakekrevingEnum);

const KVALITETSVURDERING_VERSION_VALUES = Object.values(KvalitetsvurderingVersion);

const isKvalitetsvurderingVersion = (value: number): value is KvalitetsvurderingVersion =>
  KVALITETSVURDERING_VERSION_VALUES.some((v) => v === value);

const HJEMLER_MODE_VALUES = Object.values(HjemlerModeFilter);

const isHjemlerModeFilter = (value: string): value is HjemlerModeFilter => HJEMLER_MODE_VALUES.some((v) => v === value);
