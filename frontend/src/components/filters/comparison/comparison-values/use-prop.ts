import { QueryParams } from '../../filter-query-params';
import { useQueryFilter } from '../../hooks/use-query-filter';
import { isComparisonProp } from '../is-comparison-prop';

export const useComparisonProp = () => {
  const prop = useQueryFilter(QueryParams.COMPARISON_PROP);

  if (!isComparisonProp(prop)) {
    return null;
  }

  return prop;
};
