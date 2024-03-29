import { useUser } from '@app/simple-api-state/use-user';
import { useKvalitetsvurderingIsFinished } from './use-kvalitetsvurdering-is-finished';
import { useSaksdata } from './use-saksdata';

export const useCanEdit = () => {
  const user = useUser();
  const { data: saksdata, isLoading } = useSaksdata();
  const finished = useKvalitetsvurderingIsFinished();

  if (finished || isLoading || typeof saksdata === 'undefined') {
    return false;
  }

  return saksdata.avsluttetAvSaksbehandler === null && saksdata.utfoerendeSaksbehandler === user.ident;
};
