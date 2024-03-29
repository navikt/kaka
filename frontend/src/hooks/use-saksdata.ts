import { useGetSaksdataQuery } from '@app/redux-api/saksdata';
import { useSaksdataId } from './use-saksdata-id';

export const useSaksdata = () => {
  const saksdataId = useSaksdataId();

  return useGetSaksdataQuery(saksdataId);
};
