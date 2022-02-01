import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';
import { FORMAT, MONTH_FORMAT } from '../filters/date-presets/constants';
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
    return NOW.subtract(3, 'month').format(FORMAT);
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

export const useFromMonthQueryFilter = (): string => {
  const queryValue = useQueryFilter(QueryParams.FROM_MONTH);

  if (queryValue === null || queryValue.length === 0) {
    return NOW.subtract(1, 'month').format(MONTH_FORMAT);
  }

  return queryValue;
};

export const useToMonthQueryFilter = (): string => {
  const queryValue = useQueryFilter(QueryParams.TO_MONTH);

  if (queryValue === null || queryValue.length === 0) {
    return NOW.subtract(1, 'month').format(MONTH_FORMAT);
  }

  return queryValue;
};
