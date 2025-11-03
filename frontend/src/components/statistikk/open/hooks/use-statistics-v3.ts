import { useStatisticsOpen } from '@app/simple-api-state/statistics/v3/use-statistics-open';
import type { IStatisticVurderingV3 } from '@app/types/statistics/v3';
import { useMemo } from 'react';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useSakstypeFilter,
  useToDateQueryFilter,
} from '../../../filters/hooks/use-query-filter';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsOpen({ fromDate, toDate });
};

export const useOpenStatisticsV3IsLoading = (): boolean => useStatistics().isLoading;

const useAllStatisticsV3 = (): IStatisticVurderingV3[] => {
  const { data } = useStatistics();

  return data?.rest ?? [];
};

export const useFilteredStatisticsV3 = () => {
  const data = useAllStatisticsV3();

  const types = useSakstypeFilter();
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
