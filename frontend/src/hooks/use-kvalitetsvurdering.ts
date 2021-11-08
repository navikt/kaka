import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useGetKvalitetsvurderingQuery } from '../redux-api/kvalitetsvurdering';
import { IKvalitetsvurdering } from '../types/kvalitetsvurdering';
import { useSaksdata } from './use-saksdata';

export const useKvalitetsvurdering = (): [IKvalitetsvurdering | undefined, boolean] => {
  const [saksdata, saksdataIsLoading] = useSaksdata();
  const query = saksdataIsLoading ? skipToken : saksdata?.kvalitetsvurderingId ?? skipToken;
  const { data, isLoading, isFetching } = useGetKvalitetsvurderingQuery(query);

  return [data, saksdataIsLoading || isLoading || isFetching];
};
