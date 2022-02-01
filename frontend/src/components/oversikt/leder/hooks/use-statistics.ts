import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { useGetUserDataQuery } from '../../../../redux-api/metadata';
import { useGetManagerStatisticsQuery } from '../../../../redux-api/statistics';
import { IManagerStatisticsQuery, IStatisticVurdering } from '../../../../types/statistics';
import { useFromMonthQueryFilter, useQueryFilters, useToMonthQueryFilter } from '../../hooks/use-query-filter';
import { QueryParams } from '../../types';

const useStatistics = () => {
  const { data: userData } = useGetUserDataQuery();
  const fromMonth = useFromMonthQueryFilter();
  const toMonth = useToMonthQueryFilter();

  const saksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  const query: IManagerStatisticsQuery | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : { fromMonth, toMonth, saksbehandlere, enhetId: userData.ansattEnhet.navn };

  return useGetManagerStatisticsQuery(query, { pollingInterval: 3 * 60 * 1000 });
};

export const useManagerStatisticsIsLoading = (): boolean => useStatistics().isLoading;

export const useAllManagerStatistics = (): IStatisticVurdering[] => {
  const { data } = useStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredManagerStatistics = () => {
  const data = useAllManagerStatistics();

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const klageenheter = useQueryFilters(QueryParams.KLAGEENHETER);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);

  return useMemo(
    () =>
      data.filter(
        ({ ytelseId, sakstypeId, utfallId, tilknyttetEnhet, hjemmelIdList }) =>
          (klageenheter.length === 0 || klageenheter.includes(tilknyttetEnhet)) &&
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
      ),
    [data, types, ytelser, utfall, klageenheter, hjemler]
  );
};
