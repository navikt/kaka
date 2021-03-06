import { useMemo } from 'react';
import { useGetTotalStatisticsQuery } from '../../../../redux-api/statistics';
import { IFullStatisticVurdering } from '../../../../types/statistics';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../../filters/hooks/use-query-filter';

const useTotalStatistics = () => {
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);
  return useGetTotalStatisticsQuery({ fromDate, toDate }, { pollingInterval: 3 * 60 * 1000 });
};

export const useTotalStatisticsIsLoading = (): boolean => useTotalStatistics().isLoading;

const useAllTotalStatistics = (): IFullStatisticVurdering[] => {
  const { data } = useTotalStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredTotalStatistics = () => {
  const data = useAllTotalStatistics();

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const enheter = useQueryFilters(QueryParams.ENHETER);
  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);

  return useMemo(
    () =>
      data.filter(
        ({ ytelseId, sakstypeId, utfallId, tilknyttetEnhet, vedtaksinstansEnhet, hjemmelIdList }) =>
          (klageenheter.length === 0 || klageenheter.includes(tilknyttetEnhet)) &&
          (enheter.length === 0 || vedtaksinstansEnhet === null || enheter.includes(vedtaksinstansEnhet)) &&
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
      ),
    [data, types, ytelser, utfall, enheter, klageenheter, hjemler]
  );
};
