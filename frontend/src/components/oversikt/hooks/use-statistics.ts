import { useMemo } from 'react';
import { useGetStatisticsQuery } from '../../../redux-api/statistics';
import { IStatisticVurdering } from '../../../types/statistics';
import { QueryParams } from '../types';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from './use-query-filter';

const useStatistics = () => {
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();
  return useGetStatisticsQuery({ fromDate, toDate }, { pollingInterval: 3 * 60 * 1000 });
};

export const useStatisticsIsLoading = (): boolean => useStatistics().isLoading;

export const useAllStatistics = (): IStatisticVurdering[] => {
  const { data } = useStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredStatistics = () => {
  const data = useAllStatistics();

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

export const useFilteredFinishedStatistics = () => {
  const data = useFilteredStatistics();
  return useMemo(() => data.filter(({ avsluttetAvSaksbehandler }) => avsluttetAvSaksbehandler !== null), [data]);
};
