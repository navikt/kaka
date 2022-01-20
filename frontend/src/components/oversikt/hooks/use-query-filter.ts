import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../types';

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

const NOW = dayjs();

export const useFromDateQueryFilter = (): string => {
  const queryValue = useQueryFilter(QueryParams.FROM_DATE);

  if (queryValue === null || queryValue.length === 0) {
    return NOW.subtract(3, 'month').format('YYYY-MM-DD');
  }

  return queryValue;
};

export const useToDateQueryFilter = (): string => {
  const queryValue = useQueryFilter(QueryParams.TO_DATE);

  if (queryValue === null || queryValue.length === 0) {
    return NOW.format('YYYY-MM-DD');
  }

  return queryValue;
};
