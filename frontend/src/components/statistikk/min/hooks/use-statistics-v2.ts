import { useCallback, useMemo } from 'react';
import { useStatisticsMy } from '@app/simple-api-state/statistics/v2/use-statistics-my';
import { IFullStatisticVurderingV2 } from '@app/types/statistics/v2';
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
  const fromDate = useFromDateQueryFilter(FORMATTED_START_OF_MONTH);
  const toDate = useToDateQueryFilter(FORMATTED_NOW);

  return useStatisticsMy({ fromDate, toDate });
};

export const useMyStatisticsV2IsLoading = (): boolean => useStatistics().isLoading;

const EMPTY_ARRAY: IFullStatisticVurderingV2[] = [];

export const useFilteredMyStatisticsV2 = () => {
  const { data } = useStatistics();

  const mine = useMemo(() => data?.mine ?? EMPTY_ARRAY, [data]);
  const rest = useMemo(() => data?.rest ?? EMPTY_ARRAY, [data]);

  const types = useQueryFilters(QueryParams.TYPES);
  const ytelser = useQueryFilters(QueryParams.YTELSER);
  const utfall = useQueryFilters(QueryParams.UTFALL);
  const hjemler = useQueryFilters(QueryParams.HJEMLER);
  const tilbakekreving = useTilbakekrevingQueryFilter(TilbakekrevingEnum.INCLUDE);

  const filter = useCallback(
    ({ ytelseId, sakstypeId, utfallId, hjemmelIdList }: IFullStatisticVurderingV2) =>
      tilbakekrevingFilter(hjemmelIdList, tilbakekreving) &&
      (utfall.length === 0 || utfall.includes(utfallId)) &&
      (types.length === 0 || types.includes(sakstypeId)) &&
      (ytelser.length === 0 || ytelseId === null || ytelser.includes(ytelseId)) &&
      (hjemler.length === 0 || hjemmelIdList.some((id) => hjemler.includes(id))),
    [hjemler, tilbakekreving, types, utfall, ytelser],
  );

  return useMemo(() => ({ mine: mine.filter(filter), rest: rest.filter(filter) }), [mine, filter, rest]);
};
