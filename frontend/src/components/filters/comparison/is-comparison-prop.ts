import { ComparableQueryParams } from '../filter-query-params';

export const COMPARISON_PROPS = Object.values(ComparableQueryParams);

export const isComparisonProp = (key: string | null): key is ComparableQueryParams =>
  COMPARISON_PROPS.some((k) => k === key);
