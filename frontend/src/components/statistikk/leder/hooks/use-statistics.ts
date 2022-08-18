import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { useGetManagerStatisticsQuery } from '../../../../redux-api/statistics';
import { useUser } from '../../../../simple-api-state/use-user';
import { IFullStatisticVurdering, IManagerStatisticsQuery } from '../../../../types/statistics';
import { FORMATTED_END_OF_LAST_MONTH, FORMATTED_START_OF_LAST_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromMonthQueryFilter,
  useQueryFilters,
  useToMonthQueryFilter,
} from '../../../filters/hooks/use-query-filter';

const useStatistics = () => {
  const { data: userData } = useUser();
  const fromMonth = useFromMonthQueryFilter(FORMATTED_START_OF_LAST_MONTH);
  const toMonth = useToMonthQueryFilter(FORMATTED_END_OF_LAST_MONTH);

  const saksbehandlere = useQueryFilters(QueryParams.SAKSBEHANDLERE);

  const query: IManagerStatisticsQuery | typeof skipToken =
    typeof userData === 'undefined'
      ? skipToken
      : { fromMonth, toMonth, saksbehandlere, enhetId: userData.ansattEnhet.id };

  return useGetManagerStatisticsQuery(query, { pollingInterval: 3 * 60 * 1000 });
};

export const useManagerStatisticsIsLoading = (): boolean => useStatistics().isLoading;

const useAllManagerStatistics = (): IFullStatisticVurdering[] => {
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
