import { useSaksbehandlere } from '@app/simple-api-state/use-saksbehandlere';
import { useUser } from '@app/simple-api-state/use-user';
import { Filter } from './common/filter';
import { FilterType } from './types';

interface Props {
  selected: string[];
  setSelected: (saksbehandlere: string[]) => void;
}

export const SaksbehandlerFilter = ({ selected, setSelected }: Props) => {
  const user = useUser();
  const { data } = useSaksbehandlere(user.ansattEnhet.id);

  const saksbehandlere: FilterType[] = data?.map(({ navIdent, navn }) => ({ id: navIdent, label: navn })) ?? [];

  return <Filter label="Saksbehandler" selected={selected} filters={saksbehandlere} setSelected={setSelected} />;
};
