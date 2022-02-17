import { useMemo } from 'react';
import { useGetOpenStatisticsQuery } from '../../../../redux-api/statistics';
import { IStatisticVurdering } from '../../../../types/statistics';
import { QueryParams } from '../../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../../filters/hooks/use-query-filter';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();
  return useGetOpenStatisticsQuery({ fromDate, toDate }, { pollingInterval: 3 * 60 * 1000 });
};

export const useTotalStatisticsIsLoading = (): boolean => useStatistics().isLoading;

export const useAllStatistics = (): IStatisticVurdering[] => {
  const { data } = useStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredStatistics = () => {
  const data = useAllStatistics();

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);

  return useMemo(
    () =>
      data.filter(
        ({ ytelseId, sakstypeId, utfallId }) =>
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId))
      ),
    [data, types, ytelser, utfall]
  );
};
