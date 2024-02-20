import { useMemo } from 'react';
import {
  useDefaultQueryAapen,
  useDefaultQueryLeder,
  useDefaultQueryTilbakemeldinger,
  useDefaultQueryTotal,
} from './use-default-query-params';
import { useUserAccess } from './use-user-access';

export const useIndexPath = () => {
  const defaultQueryAapen = useDefaultQueryAapen();
  const defaultQueryLeder = useDefaultQueryLeder();
  const defaultQueryTotal = useDefaultQueryTotal();
  const defaultQueryTilbakemeldinger = useDefaultQueryTilbakemeldinger();

  const access = useUserAccess();

  return useMemo(() => {
    if (access.KAKA_KVALITETSTILBAKEMELDINGER) {
      return `/tilbakemeldinger?${defaultQueryTilbakemeldinger}`;
    }

    if (access.KAKA_LEDERSTATISTIKK) {
      return `/statistikk/leder?${defaultQueryLeder}`;
    }

    if (access.KAKA_KVALITETSVURDERING) {
      return '/kvalitetsvurderinger';
    }

    if (access.KAKA_TOTALSTATISTIKK) {
      return `/statistikk/total?${defaultQueryTotal}`;
    }

    return `/statistikk/aapen?${defaultQueryAapen}`;
  }, [defaultQueryAapen, defaultQueryLeder, defaultQueryTilbakemeldinger, defaultQueryTotal, access]);
};
