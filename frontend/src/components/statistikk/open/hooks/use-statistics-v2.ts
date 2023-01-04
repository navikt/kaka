import { useMemo } from 'react';
import { useStatisticsOpen } from '../../../../simple-api-state/statistics/v2/use-statistics-open';
import { IStatisticVurderingV2 } from '../../../../types/statistics/v2';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../../filters/hooks/use-query-filter';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsOpen({ fromDate, toDate });
};

export const useOpenStatisticsV2IsLoading = (): boolean => useStatistics().isLoading;

const useAllStatisticsV2 = (): IStatisticVurderingV2[] => {
  const { data } = useStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredStatisticsV2 = () => {
  const data = useAllStatisticsV2();

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
