import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { useGetMyStatisticsQuery } from '../../../../redux-api/statistics';
import { useUser } from '../../../../simple-api-state/use-user';
import { IFullStatisticVurdering, IStatisticsQuery } from '../../../../types/statistics';
import { FORMATTED_NOW, FORMATTED_START_OF_MONTH } from '../../../filters/date-presets/constants';
import { QueryParams } from '../../../filters/filter-query-params';
import {
  useFromDateQueryFilter,
  useQueryFilters,
  useTilbakekrevingQueryFilter,
  useToDateQueryFilter,
} from '../../../filters/hooks/use-query-filter';
import { TilbakekrevingEnum } from '../../../filters/types';
import { tilbakekrevingFilter } from '../../filters/tilbakekreving';

const useStatistics = () => {
  const { data: userData } = useUser();
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

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
  const tilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  return useMemo(
    () =>
      data.filter(
        ({ ytelseId, sakstypeId, utfallId, hjemmelIdList }) =>
          tilbakekrevingFilter(hjemmelIdList, tilbakekreving) &&
          (utfall.length === 0 || utfall.includes(utfallId)) &&
          (types.length === 0 || types.includes(sakstypeId)) &&
          (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
          (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id)))
      ),
    [data, tilbakekreving, utfall, types, ytelser, hjemler]
  );
};
