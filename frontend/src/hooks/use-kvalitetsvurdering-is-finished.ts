import { useGetSaksdataQuery } from '@app/redux-api/saksdata';
import { useSaksdataId } from './use-saksdata-id';

export const useKvalitetsvurderingIsFinished = () => {
  const id = useSaksdataId();
  const { data: saksdata } = useGetSaksdataQuery(id);

  return typeof saksdata?.avsluttetAvSaksbehandler === 'string';
};
