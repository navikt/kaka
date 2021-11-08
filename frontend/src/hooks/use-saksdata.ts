import { useGetSaksdataQuery } from '../redux-api/saksdata';
import { ISaksdata } from '../types/saksdata';
import { useSaksdataId } from './use-saksdata-id';

export const useSaksdata = (): [ISaksdata | undefined, boolean] => {
  const saksdataId = useSaksdataId();
  const { data, isLoading, isFetching } = useGetSaksdataQuery(saksdataId);

  return [data, isLoading || isFetching];
};
