import { QueryParams } from '@app/components/filters/filter-query-params';
import { useQueryFilters } from '@app/components/filters/hooks/use-query-filter';
import { isYtelsegruppe, YTELSEGRUPPER } from '@app/components/statistikk/types';

export const useYtelserQueryFilter = () => {
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const ytelsegrupper = useQueryFilters(QueryParams.YTELSEGRUPPER);

  return getYtelserFromYtelsegrupper(ytelsegrupper, ytelser);
};

export const getYtelserFromYtelsegrupper = (ytelsegrupper: string[], flatYtelser: string[]): string[] => {
  const fromGrupper = ytelsegrupper.flatMap((gruppe) => (isYtelsegruppe(gruppe) ? YTELSEGRUPPER[gruppe] : []));

  return Array.from(new Set([...flatYtelser, ...fromGrupper]));
};
