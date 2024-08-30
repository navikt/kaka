import { useStatisticsOpen } from '@app/simple-api-state/statistics/v1/use-statistics-open';
import type { IStatisticVurderingV1 } from '@app/types/statistics/v1';
import { useMemo } from 'react';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../../filters/hooks/use-query-filter';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsOpen({ fromDate, toDate });
};

export const useOpenStatisticsV1IsLoading = (): boolean => useStatistics().isLoading;

const useAllStatisticsV1 = (): IStatisticVurderingV1[] => {
  const { data } = useStatistics();

  return data?.rest ?? [];
};

export const useFilteredStatisticsV1 = () => {
  const data = useAllStatisticsV1();

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);

  return useMemo(
    () =>
      data.filter(
        ({ ytelseId, sakstypeId, utfallId }) =>
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)),
      ),
    [data, types, ytelser, utfall],
  );
};
