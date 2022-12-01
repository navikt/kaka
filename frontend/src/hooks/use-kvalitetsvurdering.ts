import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetKvalitetsvurderingQuery } from '../redux-api/kvalitetsvurdering/v1';
import { IKvalitetsvurderingV1 } from '../types/kvalitetsvurdering/v1';
import { useSaksdata } from './use-saksdata';

export const useKvalitetsvurdering = (): [IKvalitetsvurderingV1 | undefined, boolean] => {
  const { data: saksdata, isLoading: saksdataIsLoading } = useSaksdata();
  const query = saksdataIsLoading ? skipToken : saksdata?.kvalitetsvurderingId ?? skipToken;
  const { data, isLoading, isFetching } = useGetKvalitetsvurderingQuery(query);

  return [data, saksdataIsLoading || isLoading || isFetching];
};
