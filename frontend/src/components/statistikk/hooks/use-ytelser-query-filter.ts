import { QueryParams } from '@app/components/filters/filter-query-params';
import { useQueryFilters } from '@app/components/filters/hooks/use-query-filter';
import { isYtelsegruppe, YTELSESGRUPPER } from '@app/components/statistikk/types';

export const useYtelserQueryFilter = () => {
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const ytelsesgrupper = useQueryFilters(QueryParams.YTELSESGRUPPER);

  return getYtelserFromYtelsegrupper(ytelsesgrupper, ytelser);
};

export const getYtelserFromYtelsegrupper = (ytelsesgrupper: string[], flatYtelser: string[]): string[] => {
  const fromGrupper = ytelsesgrupper.flatMap((gruppe) => (isYtelsegruppe(gruppe) ? YTELSESGRUPPER[gruppe] : []));

  return Array.from(new Set([...flatYtelser, ...fromGrupper]));
};
