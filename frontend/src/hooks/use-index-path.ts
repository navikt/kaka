import { useMemo } from 'react';
import {
  useDefaultQueryAapen,
  useDefaultQueryLeder,
  useDefaultQueryTilbakemeldinger,
  useDefaultQueryTotal,
} from './use-default-query-params';
import { useUserHasRole } from './use-user-access';

export const useIndexPath = () => {
  const defaultQueryAapen = useDefaultQueryAapen();
  const defaultQueryLeder = useDefaultQueryLeder();
  const defaultQueryTotal = useDefaultQueryTotal();
  const defaultQueryTilbakemeldinger = useDefaultQueryTilbakemeldinger();

  const { isLoading, roles } = useUserHasRole();

  return useMemo(() => {
    if (isLoading) {
      return '/';
    }

    if (roles.KAKA_KVALITETSTILBAKEMELDINGER) {
      return `/tilbakemeldinger?${defaultQueryTilbakemeldinger}`;
    }

    if (roles.KAKA_LEDERSTATISTIKK) {
      return `/statistikk/leder?${defaultQueryLeder}`;
    }

    if (roles.KAKA_KVALITETSVURDERING) {
      return '/kvalitetsvurderinger';
    }

    if (roles.KAKA_TOTALSTATISTIKK) {
      return `/statistikk/total?${defaultQueryTotal}`;
    }

    return `/statistikk/aapen?${defaultQueryAapen}`;
  }, [defaultQueryAapen, defaultQueryLeder, defaultQueryTilbakemeldinger, defaultQueryTotal, isLoading, roles]);
};
