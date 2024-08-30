import { useSearchParams } from 'react-router-dom';
import type { QueryParams } from '../../filters/filter-query-params';

export const useQueryParam = (param: QueryParams, defaultValue = ''): [string, (value: string) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(param);

  const setValue = (value: string) => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };

  const value: string = query === null || query.length === 0 ? defaultValue : query;

  return [value, setValue];
};
