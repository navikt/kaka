import { useGetKvalitetsvurderingQuery } from '@app/redux-api/kvalitetsvurdering/v1';
import type { IKvalitetsvurderingV1 } from '@app/types/kvalitetsvurdering/v1';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSaksdata } from './use-saksdata';

export const useKvalitetsvurdering = (): [IKvalitetsvurderingV1 | undefined, boolean] => {
  const { data: saksdata, isLoading: saksdataIsLoading } = useSaksdata();
  const query = saksdataIsLoading ? skipToken : (saksdata?.kvalitetsvurderingReference?.id ?? skipToken);
  const { data, isLoading, isFetching } = useGetKvalitetsvurderingQuery(query);

  return [data, saksdataIsLoading || isLoading || isFetching];
};
