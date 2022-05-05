import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../filters/filter-query-params';

export const useQueryFilter = (filter: QueryParams): string | null => {
  const [searchParams] = useSearchParams();
  return searchParams.get(filter);
};

export const useQueryFilterDefault = (filter: QueryParams, defaultValue: string): string => {
  const queryValue = useQueryFilter(filter);

  if (queryValue === null || queryValue.length === 0) {
    return defaultValue;
  }

  return queryValue;
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
