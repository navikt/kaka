import { useMemo } from 'react';
import { useSakstyperToUtfall } from '../simple-api-state/use-kodeverk';
import { IKodeverkSimpleValue } from '../types/kodeverk';
import { SakstypeEnum } from '../types/sakstype';
import { UtfallEnum } from '../types/utfall';

export const useUtfall = (type?: SakstypeEnum): [IKodeverkSimpleValue<UtfallEnum>[], boolean] => {
  const { data } = useSakstyperToUtfall();

  return useMemo(() => {
    if (typeof data === 'undefined' || typeof type === 'undefined') {
      return [[], true];
    }

    const utfall = data.find(({ id }) => id === type)?.utfall ?? [];

    return [utfall, false];
  }, [data, type]);
};
