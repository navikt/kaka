import { useMemo } from 'react';
import { Page, hasPageAccess } from '../components/routing/access-roles';
import { useDefaultQuery, useDefaultQueryLeder } from './use-default-query-params';
import { useUserAccess } from './use-user-access';

export const useIndexPath = () => {
  const lederQuery = useDefaultQueryLeder();
  const openQuery = useDefaultQuery();
  const defaultQuery = useDefaultQuery();

  const { isLoading, access } = useUserAccess();

  return useMemo(() => {
    if (isLoading || typeof access === 'undefined') {
      return '/';
    }

    if (hasPageAccess(Page.TILBAKEMELDINGER, access)) {
      return `/tilbakemeldinger?${defaultQuery}`;
    }

    if (hasPageAccess(Page.LEDERSTATISTIKK, access)) {
      return `/statistikk/leder?${lederQuery}`;
    }

    if (hasPageAccess(Page.KVALITETSVURDERINGER, access)) {
      return '/kvalitetsvurderinger';
    }

    if (hasPageAccess(Page.TOTALSTATISTIKK, access)) {
      return `/statistikk/total?${lederQuery}`;
    }

    return `/statistikk/aapen?${openQuery}`;
  }, [isLoading, access, lederQuery, openQuery, defaultQuery]);
};
