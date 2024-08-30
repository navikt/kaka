import { useSakstyper } from '@app/simple-api-state/use-kodeverk';
import { Filter } from './common/filter';
import type { FilterType } from './types';

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

export const SakstypeFilter = ({ selected, setSelected }: SakstypeFilterProps) => {
  const { data = [] } = useSakstyper();

  const sakstyper = data?.map<FilterType>(({ id, navn }) => ({ id, label: navn })) ?? [];

  return <Filter label="Type" filters={sakstyper} selected={selected} setSelected={setSelected} />;
};
