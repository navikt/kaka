import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo } from 'react';
import { useStatisticsMy } from '../../../../simple-api-state/statistics/v1/use-statistics-my';
import { useUser } from '../../../../simple-api-state/use-user';
import { IFullStatisticVurderingV1, IStatisticsQuery } from '../../../../types/statistics/v1';
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

  return useStatisticsMy(query);
};

export const useMyStatisticsV1IsLoading = (): boolean => useStatistics().isLoading;

const useAllMyStatistics = (): IFullStatisticVurderingV1[] => {
  const { data } = useStatistics();

  return data?.anonymizedFinishedVurderingList ?? [];
};

export const useFilteredMyStatisticsV1 = () => {
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
