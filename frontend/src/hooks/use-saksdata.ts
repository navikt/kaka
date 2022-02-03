import { useGetSaksdataQuery } from '../redux-api/saksdata';
import { ISaksdataComplete, ISaksdataIncomplete } from '../types/saksdata';
import { useSaksdataId } from './use-saksdata-id';

export const useSaksdata = (): [ISaksdataComplete | ISaksdataIncomplete | undefined, boolean] => {
  const saksdataId = useSaksdataId();
  const { data, isLoading, isFetching } = useGetSaksdataQuery(saksdataId);

  return [data, isLoading || isFetching];
};
