import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { useGetUserDataQuery } from '../../../../redux-api/metadata';
import { useGetMyStatisticsQuery } from '../../../../redux-api/statistics';
import { IFullStatisticVurdering, IStatisticsQuery } from '../../../../types/statistics';
import { QueryParams } from '../../../filters/filter-query-params';
import { useFromDateQueryFilter, useQueryFilters, useToDateQueryFilter } from '../../../filters/hooks/use-query-filter';

const useStatistics = () => {
  const { data: userData } = useGetUserDataQuery();
  const fromDate = useFromDateQueryFilter();
  const toDate = useToDateQueryFilter();

  const query: IStatisticsQuery | typeof skipToken = typeof userData === 'undefined' ? skipToken : { fromDate, toDate };

  return useGetMyStatisticsQuery(query, { pollingInterval: 3 * 60 * 1000 });
};

export const useMyStatisticsIsLoading = (): boolean => useStatistics().isLoading;

const useAllMyStatistics = (): IFullStatisticVurdering[] => {
  const { data } = useStatistics();
  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredMyStatistics = () => {
  const data = useAllMyStatistics();

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);

  return useMemo(
    () =>
      data.filter(
        ({ ytelseId, sakstypeId, utfallId, hjemmelIdList }) =>
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
      ),
    [data, types, ytelser, utfall, hjemler]
  );
};
