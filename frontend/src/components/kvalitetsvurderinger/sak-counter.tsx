import type { ISaksdataBase } from '@app/types/saksdata';
import { Detail } from '@navikt/ds-react';

interface SaksCounterProps {
  list?: ISaksdataBase[];
}

export const SakCounter = ({ list }: SaksCounterProps) => {
  if (typeof list === 'undefined' || list.length === 0) {
    return <Detail>0 saker</Detail>;
  }

  if (list.length === 1) {
    return <Detail>{list.length} sak</Detail>;
  }

  return <Detail>{list.length} saker</Detail>;
};
