import { useSearchParams } from 'react-router-dom';
import { RadiovalgField } from '@app/types/statistics/v1';
import { QueryParams } from '../../filters/filter-query-params';
import { isAllowedKey } from '../charts/kvalitetsvurderinger/kvalitetsvurdering-options';

export const useKvalitetsvurderingParam = (): [RadiovalgField, (kvalitetsvurderingId: RadiovalgField) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(QueryParams.KVALITETSVURDERING);

  const setKvalitetsvurdering = (kvalitetsvurderingId: RadiovalgField) => {
    searchParams.set(QueryParams.KVALITETSVURDERING, kvalitetsvurderingId);
    setSearchParams(searchParams);
  };

  const kvalitetsvurdering: RadiovalgField = isAllowedKey(query) ? query : 'klageforberedelsenRadioValg';

  return [kvalitetsvurdering, setKvalitetsvurdering];
};
