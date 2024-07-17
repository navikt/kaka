import { useGetCompleteSaksdataListQuery } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { VurderingerTable } from './table';

export const FullfoerteVurderingerTable = () => {
  const userData = useUser();

  const { data } = useGetCompleteSaksdataListQuery({
    saksbehandlerIdent: userData.ident,
  });

  return <VurderingerTable data={data} testId="fullfoerte-vurderinger" />;
};
