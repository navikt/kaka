import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../../filters/filter-query-params';
import { KvalitetsvurderingProps } from '../charts/kvalitetsvurderinger/kvalitetsvurdering';
import { isAllowedKey } from '../toggle-kvalitetsvurdering';

export const useKvalitetsvurderingParam = (): [
  KvalitetsvurderingProps['field'],
  (kvalitetsvurderingId: KvalitetsvurderingProps['field']) => void
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.KVALITETSVURDERING);

  const setKvalitetsvurdering = (kvalitetsvurderingId: KvalitetsvurderingProps['field']) => {
    searchParams.set(QueryParams.KVALITETSVURDERING, kvalitetsvurderingId);
    setSearchParams(searchParams);
  };

  const kvalitetsvurdering: KvalitetsvurderingProps['field'] = isAllowedKey(query)
    ? query
    : 'klageforberedelsenRadioValg';

  return [kvalitetsvurdering, setKvalitetsvurdering];
};
