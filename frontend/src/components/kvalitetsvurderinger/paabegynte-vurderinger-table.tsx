import { useGetIncompleteSaksdataListQuery } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { VurderingerTable } from './table';

export const PaabegynteVurderingerTable = () => {
  const userData = useUser();

  const { data } = useGetIncompleteSaksdataListQuery({
    saksbehandlerIdent: userData.ident,
  });

  return <VurderingerTable data={data} testId="paabegynte-vurderinger" />;
};
