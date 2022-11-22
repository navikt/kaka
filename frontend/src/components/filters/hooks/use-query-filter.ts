import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../filters/filter-query-params';
import { TilbakekrevingEnum } from '../types';

const useQueryFilter = (filter: QueryParams): string | null => {
  const [searchParams] = useSearchParams();

  return searchParams.get(filter);
};

const EMPTY_ARRAY: string[] = [];

export const useQueryFilters = (filter: QueryParams): string[] => useQueryFilter(filter)?.split(',') ?? EMPTY_ARRAY;

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

export const useTilbakekrevingQueryFilter = (): TilbakekrevingEnum | undefined => {
  const queryValue = useQueryFilter(QueryParams.TILBAKEKREVING);

  if (queryValue === null || queryValue.length === 0) {
    return undefined;
  }

  if (!isTilbakekrevingEnum(queryValue)) {
    return undefined;
  }

  return queryValue;
};

const isTilbakekrevingEnum = (value: string): value is TilbakekrevingEnum =>
  Object.values(TilbakekrevingEnum).includes(value as TilbakekrevingEnum);
