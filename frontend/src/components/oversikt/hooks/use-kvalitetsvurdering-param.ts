import { useSearchParams } from 'react-router-dom';
import { KvalitetsvurderingProps } from '../charts/kvalitetsvurdering';
import { isAllowedKey } from '../toggle-kvalitetsvurdering';
import { QueryParams } from '../types';

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
