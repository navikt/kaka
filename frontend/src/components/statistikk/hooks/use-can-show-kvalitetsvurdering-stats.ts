import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import { SakstypeEnum } from '@app/types/sakstype';

export const useCanShowKvalitetsvurderingStats = (): boolean => {
  const types = useSakstypeFilter();

  return types.length > 0 && types.every((type) => type === SakstypeEnum.KLAGE || type === SakstypeEnum.ANKE);
};
