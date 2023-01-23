import { useSearchParams } from 'react-router-dom';
import { OptionValue } from '../../../../types/statistics/common';
import { QueryParams } from '../../filter-query-params';

export const useComparisonValues = (): OptionValue[] => {
  const [searchParams] = useSearchParams();

  const values = searchParams.get(QueryParams.COMPARISON_VALUES);
  const selectedValues = parseValues(values);

  return selectedValues;
};

const EMPTY_ARRAY: OptionValue[] = [];

const parseValues = (values: string | null): OptionValue[] => {
  if (values === null) {
    return EMPTY_ARRAY;
  }

  try {
    return JSON.parse(values);
  } catch (e) {
    return EMPTY_ARRAY;
  }
};
