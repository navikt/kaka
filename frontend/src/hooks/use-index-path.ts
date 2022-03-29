import { useMemo } from 'react';
import { useDefaultQuery, useDefaultQueryLeder } from './use-default-query-params';
import { useUserHasRole } from './use-user-access';

export const useIndexPath = () => {
  const lederQuery = useDefaultQueryLeder();
  const openQuery = useDefaultQuery();
  const defaultQuery = useDefaultQuery();
  const { isLoading, roles } = useUserHasRole();

  return useMemo(() => {
    if (isLoading) {
      return '/';
    }

    if (roles.ROLE_KAKA_KVALITETSTILBAKEMELDINGER) {
      return `/tilbakemeldinger?${defaultQuery}`;
    }

    if (roles.ROLE_KAKA_LEDERSTATISTIKK) {
      return `/statistikk/leder?${lederQuery}`;
    }

    if (roles.ROLE_KAKA_KVALITETSVURDERING) {
      return '/kvalitetsvurderinger';
    }

    if (roles.ROLE_KAKA_TOTALSTATISTIKK) {
      return `/statistikk/total?${lederQuery}`;
    }

    return `/statistikk/aapen?${openQuery}`;
  }, [isLoading, roles, lederQuery, openQuery, defaultQuery]);
};
