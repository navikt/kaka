import { useMemo } from 'react';
import { IKodeverkSimpleValue } from '../types/kodeverk';
import { SakstypeEnum } from '../types/sakstype';
import { UtfallEnum } from '../types/utfall';
import { useKodeverkValue } from './use-kodeverk-value';

export const useUtfall = (type?: SakstypeEnum): [IKodeverkSimpleValue<UtfallEnum>[], boolean] => {
  const sakstyperToUtfall = useKodeverkValue('sakstyperToUtfall');

  return useMemo(() => {
    if (typeof sakstyperToUtfall === 'undefined' || typeof type === 'undefined') {
      return [[], true];
    }

    const utfall = sakstyperToUtfall.find(({ id }) => id === type)?.utfall ?? [];

    return [utfall, false];
  }, [sakstyperToUtfall, type]);
};
