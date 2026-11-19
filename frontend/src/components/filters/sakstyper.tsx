import { useSakstyper } from '@app/hooks/use-kodeverk-value';
import { RELEVANT_SAKSTYPER } from '@app/types/sakstype';
import { Skeleton } from '@navikt/ds-react';
import { Filter } from './common/filter';

interface SakstypeFilterProps {
  selected: string[];
  setSelected: (types: string[]) => void;
}

export const SakstypeFilter = ({ selected, setSelected }: SakstypeFilterProps) => {
  const { data: kodeverk = [], isSuccess } = useSakstyper();

  const filters = RELEVANT_SAKSTYPER.map((sakstype) => {
    if (isSuccess) {
      const label = kodeverk.find(({ id }) => id === sakstype)?.navn ?? sakstype;

      return { id: sakstype, label, children: label };
    }

    return { id: sakstype, label: sakstype, children: <Skeleton width={100} height={20} /> };
  });

  return <Filter label="Sakstype" filters={filters} selected={selected} setSelected={setSelected} />;
};
